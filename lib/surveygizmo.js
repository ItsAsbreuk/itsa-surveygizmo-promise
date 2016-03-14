/**
 * lib/surveymonkey.js
 * Logic for interacting with surveymonkey.
 */

"use strict";

require("itsa-jsext");
require("itsa-utils");

var Classes = require("itsa-classes"),
    io = require("itsa-fetch/lib/fetch-node").io,
    later = require("itsa-utils").later,
    API_METHODS = require("./api-methods"),
    BASE_URL = "https://restapi.surveygizmo.com/",
    DEF_VERSION = 4,
    DELAY = 1200, // ms
    MAX_RETRIES = 3,
    API_ERROR_MAX_REQUESTS = 429,
    MAX_REQUEST_LIMIT = "Api error "+API_ERROR_MAX_REQUESTS + ": max requests reached",
    prototypes = {};


prototypes._request = function(uri, args, focedPayload, requestPayload, retry) {
    var instance = this,
        payload = requestPayload ? requestPayload.itsa_deepClone() : {};
    retry || (retry=1);
    payload.itsa_merge(focedPayload, {force: true});
    args.forEach(function(arg) {
        var replacement = {};
        replacement[arg] = payload[arg];
        uri = uri.itsa_substitute(replacement, true);
        // because `args` are custom argumetns, they should be passed to SurveyGizmo
        // (they are already part of the uri)
        delete payload[arg];
    });
    payload.api_token = this.apiToken;
    return io.read(this.baseUrl+uri, payload).then(
        function(response) {
            if (response.code===API_ERROR_MAX_REQUESTS) {
                if (retry<MAX_RETRIES) {
                    return instance._delayedRequest(uri, args, focedPayload, requestPayload, retry+1);
                }
                throw new Error(MAX_REQUEST_LIMIT);
            }
            return response;
        },
        function(err) {
            if (retry<MAX_RETRIES) {
                return instance._delayedRequest(uri, args, focedPayload, requestPayload, retry+1);
            }
            throw new Error(err);
        }
    );
};

prototypes._delayedRequest = function(uri, args, focedPayload, requestPayload, retry) {
    var instance = this;
    return new Promise(function(resolve, reject) {
        later(function() {
            instance._request(uri, args, focedPayload, requestPayload, retry).then(resolve, reject);
        }, DELAY);
    });
};

API_METHODS.itsa_each(function(apiMethodValue, apiMethod) {
    var method, uri, forcedPayload, args;
    method = apiMethodValue.method;
    args = apiMethodValue.args || [],
    uri = apiMethodValue.name;
    if (args[0]) {
        // create placeholder:
        uri += "/{"+args[0]+"}";
        if (apiMethodValue.subName) {
            // create placeholder:
            uri += "/"+apiMethodValue.subName;
            if (args[1]) {
                // create placeholder:
                uri += "/{"+args[1]+"}";
                if (apiMethodValue.subSubName) {
                    // create placeholder:
                    uri += "/"+apiMethodValue.subSubName;
                    if (args[2]) {
                        // create placeholder:
                        uri += "/{"+args[2]+"}";
                    }
                }
            }
        }
    }
    forcedPayload = apiMethodValue.payload || {};
    method && (forcedPayload._method=method);
    prototypes[apiMethod] = function(payload) {
        return this._request.call(this, uri, args, forcedPayload, payload).then(function(response) {
            if (!response.result_ok) {
                throw new Error(response.message);
            }
            return response;
        });
    };
});

var SurveyMonkeyAPIPromisesClass = Classes.createClass(function(apiToken, version) {
    this.apiToken = apiToken;
    version || (version=DEF_VERSION);
    version = String(version).toLowerCase();
    (version[0]==="v") || (version="v"+version);
    this.version = version;
    this.baseUrl = BASE_URL+this.version+"/";
}, prototypes);

module.exports = SurveyMonkeyAPIPromisesClass;
