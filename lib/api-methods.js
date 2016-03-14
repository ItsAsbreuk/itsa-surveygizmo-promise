/**
 * lib/surveymonkey.js
 * Logic for interacting with surveymonkey.
 */

"use strict";

var PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE",
    API_METHODS = {
        "getAccount": {
            name: "account"
        },
        "getAccountTeams": {
            name: "accountteams"
        },
        "getAccountTeam": {
            name: "accountteams",
            args: [
                "team_id"
            ]
        },
        "createAccountTeam": {
            name: "accountteams",
            method: PUT
        },
        "updateAccountTeam": {
            name: "accountteams",
            method: POST,
            args: [
                "team_id"
            ]
        },
        "deleteAccountTeam": {
            name: "accountteams",
            method: DELETE,
            args: [
                "team_id"
            ]
        },
        "getAccountUsers": {
            name: "accountuser"
        },
        "getAccountUser": {
            name: "accountuser",
            args: [
                "user_id"
            ]
        },
        "createAccountUser": {
            name: "accountuser",
            method: PUT
        },
        "updateAccountUser": {
            name: "accountuser",
            method: POST,
            args: [
                "user_id"
            ]
        },
        "deleteAccountUser": {
            name: "accountuser",
            method: DELETE,
            args: [
                "user_id"
            ]
        },
        "getContactLists": {
            name: "contactlist"
        },
        "getContactList": {
            name: "contactlist",
            args: [
                "contactlist_id"
            ]
        },
        "createContactList": {
            name: "contactlist",
            method: PUT
        },
        "updateContactList": {
            name: "contactlist",
            method: POST,
            args: [
                "contactlist_id"
            ]
        },
        "deleteContactList": {
            name: "contactlist",
            method: DELETE,
            args: [
                "contactlist_id"
            ]
        },
        "getSurveys": {
            name: "survey"
        },
        "getSurvey": {
            name: "survey",
            args: [
                "survey_id"
            ]
        },
        "createSurvey": {
            name: "survey",
            method: PUT
        },
        "updateSurvey": {
            name: "survey",
            method: POST,
            args: [
                "survey_id"
            ]
        },
        "copySurvey": {
            name: "survey",
            method: POST,
            args: [
                "survey_id"
            ],
            payload: {
                copy: true
            }
        },
        "deleteSurvey": {
            name: "survey",
            method: DELETE,
            args: [
                "survey_id"
            ]
        },
        "getSurveyPages": {
            name: "survey",
            subName: "surveypage",
            args: [
                "survey_id"
            ]
        },
        "getSurveyPage": {
            name: "survey",
            subName: "surveypage",
            args: [
                "survey_id",
                "page_id"
            ]
        },
        "createSurveyPage": {
            name: "survey",
            subName: "surveypage",
            method: PUT,
            args: [
                "survey_id"
            ]
        },
        "updateSurveyPage": {
            name: "survey",
            subName: "surveypage",
            method: POST,
            args: [
                "survey_id",
                "page_id"
            ]
        },
        "deleteSurveyPage": {
            name: "survey",
            subName: "surveypage",
            method: DELETE,
            args: [
                "survey_id",
                "page_id"
            ]
        },
        "getSurveyQuestions": {
            name: "survey",
            subName: "surveyquestion",
            args: [
                "survey_id"
            ]
        },
        "getSurveyQuestion": {
            name: "survey",
            subName: "surveyquestion",
            args: [
                "survey_id",
                "question_id"
            ]
        },
        "createSurveyQuestion": {
            name: "survey",
            subName: "surveyquestion",
            method: PUT,
            args: [
                "survey_id"
            ]
        },
        "updateSurveyQuestion": {
            name: "survey",
            subName: "surveyquestion",
            method: POST,
            args: [
                "survey_id",
                "question_id"
            ]
        },
        "deleteSurveyQuestion": {
            name: "survey",
            subName: "surveyquestion",
            method: DELETE,
            args: [
                "survey_id",
                "question_id"
            ]
        },
        "getSurveyQuestionOptions": {
            name: "survey",
            subName: "surveyquestion",
            subSubName: "surveyoption",
            args: [
                "survey_id",
                "question_id"
            ]
        },
        "getSurveyQuestionOption": {
            name: "survey",
            subName: "surveyquestion",
            subSubName: "surveyoption",
            args: [
                "survey_id",
                "question_id",
                "option_id"
            ]
        },
        "createSurveyQuestionOption": {
            name: "survey",
            subName: "surveyquestion",
            subSubName: "surveyoption",
            method: PUT,
            args: [
                "survey_id",
                "question_id",
                "option_id"
            ]
        },
        "updateSurveyQuestionOption": {
            name: "survey",
            subName: "surveyquestion",
            subSubName: "surveyoption",
            method: POST,
            args: [
                "survey_id",
                "question_id",
                "option_id"
            ]
        },
        "deleteSurveyQuestionOption": {
            name: "survey",
            subName: "surveyquestion",
            subSubName: "surveyoption",
            method: DELETE,
            args: [
                "survey_id",
                "question_id",
                "option_id"
            ]
        },
        "getSurveyCampaigns": {
            name: "survey",
            subName: "surveycampaign",
            args: [
                "survey_id"
            ]
        },
        "getSurveyCampaign": {
            name: "survey",
            subName: "surveycampaign",
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "createSurveyCampaign": {
            name: "survey",
            subName: "surveycampaign",
            method: PUT,
            args: [
                "survey_id"
            ]
        },
        "updateSurveyCampaign": {
            name: "survey",
            subName: "surveycampaign",
            method: POST,
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "copySurveyCampaign": {
            name: "survey",
            subName: "surveycampaign",
            method: POST,
            args: [
                "survey_id",
                "campaign_id"
            ],
            payload: {
                copy: true
            }
        },
        "deleteSurveyCampaign": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "surveyoption",
            method: DELETE,
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "getSurveyCampaignContacts": {
            name: "survey",
            subName: "surveyquestion",
            subSubName: "contact",
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "getSurveyCampaignContact": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "contact",
            args: [
                "survey_id",
                "campaign_id",
                "contact_id"
            ]
        },
        "createSurveyCampaignContact": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "contact",
            method: PUT,
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "updateSurveyCampaignContact": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "contact",
            method: POST,
            args: [
                "survey_id",
                "campaign_id",
                "contact_id"
            ]
        },
        "deleteSurveyCampaignContact": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "contact",
            method: DELETE,
            args: [
                "survey_id",
                "campaign_id",
                "contact_id"
            ]
        },
        "getSurveyCampaignEmailMessages": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "emailmessage",
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "getSurveyCampaignEmailMessage": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "emailmessage",
            args: [
                "survey_id",
                "campaign_id",
                "emailmessage_id"
            ]
        },
        "createSurveyCampaignEmailMessage": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "emailmessage",
            method: PUT,
            args: [
                "survey_id",
                "campaign_id"
            ]
        },
        "updateSurveyCampaignEmailMessage": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "emailmessage",
            method: POST,
            args: [
                "survey_id",
                "campaign_id",
                "emailmessage_id"
            ]
        },
        "deleteSurveyCampaignEmailMessage": {
            name: "survey",
            subName: "surveycampaign",
            subSubName: "emailmessage",
            method: DELETE,
            args: [
                "survey_id",
                "campaign_id",
                "emailmessage_id"
            ]
        },
        "getSurveyResponses": {
            name: "survey",
            subName: "surveyresponse",
            args: [
                "survey_id"
            ]
        },
        "getSurveyResponse": {
            name: "survey",
            subName: "surveyresponse",
            args: [
                "survey_id",
                "response_id"
            ]
        },
        "createSurveyResponse": {
            name: "survey",
            subName: "surveyresponse",
            method: PUT,
            args: [
                "survey_id"
            ]
        },
        "updateSurveyResponse": {
            name: "survey",
            subName: "surveyresponse",
            method: POST,
            args: [
                "survey_id",
                "response_id"
            ]
        },
        "deleteSurveyResponse": {
            name: "survey",
            subName: "surveyresponse",
            method: DELETE,
            args: [
                "survey_id",
                "response_id"
            ]
        },
        "getSurveyStatistics": {
            name: "survey",
            subName: "surveystatistic",
            args: [
                "survey_id"
            ]
        },
        "getSurveyReports": {
            name: "survey",
            subName: "surveyreport",
            args: [
                "survey_id"
            ]
        },
        "getSurveyReport": {
            name: "survey",
            subName: "surveyreport",
            args: [
                "survey_id",
                "report_id"
            ]
        },
        "updateSurveyReport": {
            name: "survey",
            subName: "surveyreport",
            method: POST,
            args: [
                "survey_id",
                "report_id"
            ]
        },
        "deleteSurveyReport": {
            name: "survey",
            subName: "surveyreport",
            method: DELETE,
            args: [
                "survey_id",
                "report_id"
            ]
        }
    };

module.exports = API_METHODS;