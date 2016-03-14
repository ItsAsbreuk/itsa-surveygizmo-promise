
var defaultSurveyId = 2648386;
var defaultSurveyTheme = 117222;

var SurveyGizmoClass = require("../lib/surveygizmo");
var API = "39bf512688cc80e57cd02f9e048b89d95ead2550abe69bbf0c";
var sg = new SurveyGizmoClass(API);

// sg.getSurveyResponse({survey_id: 2648366, response_id: 2}).then(function(data) {

var createSurvey = function(title) {
    return sg.copySurvey({survey_id: defaultSurveyId, title: title, type: "survey", theme: defaultSurveyTheme})
    .then(
        function(response) {
            var userid = 12,
                url = response.data.links.campaign + "?sguid=" + userid;
console.log('url:', url);
console.log('editurl:', url+'&_iseditlink=true');

            return response.data.id;
        })
    .catch(
        function(err) {
            console.log("err", err.message);
        }
    );
};


// createSurvey("test copy 4");

sg.getSurvey({survey_id: 29581}).then(
    function(response) {
        console.log(response);
    },
    function(err) {
        console.log('ERROR',err);
    }
);