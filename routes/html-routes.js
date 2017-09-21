// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads view.html
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/questions/", function(req, res) {
        // switch (type) {
        //     case "validUser":
        //         queryUrl = "/location/question" + agentname;
        //         break;
        //     case "notValid":
        //         queryUrl = "/index/signUp" + agentname;
        //         break;
        //     default:
        //         return;
        // }
        res.sendFile(path.join(__dirname, "../public/neutral.html"));
    });

    // mission route loads mission.html
    app.get("/London/questions", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/London.html"));
    });

    // agents route loads agent-manager.html
    app.get("/agent", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/agent-manager.html"));
    });

};