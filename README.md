# itsa-surveygizmo-promise
Promise wrapper arround the surveygizmo api

## How to use:

First, you create a new surveyGizmo-instance, with the right `api-token`:

```js
var SurveyGizmo = require("itsa-surveygizmo-promise"),
    apiToken = "your_api-token",
    surveyGizmo = new SurveyGizmo(apiToken);
```

After this, `surveyGizmo` has all the api-methods as defined in the [api-docs](https://apihelp.surveygizmo.com/help/article/link/objects).

These methods slightly differ. They all need just 1 options-parameter with possible properties as described in the api-docs. However, the api-docs have an url that may contain info about one of the properties. F.e. `https://restapi.surveygizmo.com/v4/survey/123456/surveyquestion/1/surveyoption` has a value for `survey_id=123456` and `surveyquestion=1`. These properties need to be passed through with the `options`-parameter. Valid properties are:

* survey_id
* campaign_id
* contact_id
* question_id
* option_id

These properties are being used to finegrain the request: they will not be part of the payload to SurveyGizmo.


```js
var SurveyGizmo = require("itsa-surveygizmo-promise"),
    apiToken = "your_api-token",
    surveyGizmo = new SurveyGizmo(apiToken);


// Create a new survey:
options = {
    title: "My survey",
    type: "survey"
};
surveyGizmo.createSurvey(options)
.then(
    function(response) {
        console.log("Survey id:", response.data.id);
    })
.catch(
    function(err) {
        console.log("err", err.message);
    }
);


// Create a copy of an existing survey:
options = {
    survey_id: 1234567,
    title: "My copied survey",
    type: "survey"
};
surveyGizmo.copySurvey(options)
.then(
    function(response) {
        console.log("Survey id:", response.data.id);
    })
.catch(
    function(err) {
        console.log("err", err.message);
    }
);
```