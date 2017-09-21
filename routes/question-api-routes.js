// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
const uuidv4 = require("uuid/v4");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the questions
    app.get("/api/questions", function(req, res) {
        var query = {};
        db.Question.findAll({
            where: query,
            include: [db.Agent]
        }).then(function(dbQuestion) {
            res.json(dbQuestion);
        });
    });

    app.get("/api/London/questions", function(req, res) {
        var query = {
            city: "London"
        };
        db.Question.findOne({
            where: query,
            include: [db.Agent]
        }).then(function(dbQuestion) {
            res.json(dbQuestion);
        });
    });


    app.get("/api/questions/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Agent
        console.log(req.params.id);
        db.Question.findOne({
            where: {
                uuid: req.params.id
            },
            include: [db.Agent]
        }).then(function(dbQuestion) {

            res.json(dbQuestion);
        });
    });


    // var queryUrl;
    // //switch to rout whether a user has loaded a URL with a valid UUID and is existing user
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

    // Mission route for saving a new Mission
    app.post("/api/questions", function(req, res) {
        var uuid;
        var city = ["London", "Berlin", "Moscow"];
        var rand;
        var qrURL;
        for (var i = 0; i < req.body.question.length; i++) {
            rand = Math.floor((Math.random() * 3));
            uuid = uuidv4();
            qrURL = "http://api.qrserver.com/v1/create-qr-code/?data=" + uuid + "&size=100x100";

            db.Question.create({
                uuid: uuid,
                city: city[rand],
                question: req.body.question[i],
                correct_answer: req.body.correct_answer[i],
                qrURL: qrURL
            })

        }
    });

    // DELETE route for deleting mission
    app.delete("/api/questions/:id", function(req, res) {
        db.Question.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbQuestion) {
            res.json(dbQuestion);
        });
    });

    // PUT route for updating Question
    app.put("/api/questions", function(req, res) {
        db.Question.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbQuestion) {
            res.json(dbQuestion);
        });
    });
};