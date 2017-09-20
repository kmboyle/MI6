// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the mission
    app.get("/api/mission", function(req, res) {
        var query = {};
        if (!req.query.agent_id) {
            //  query.AgentId = req.query.agent_id;

            db.Mission.findAll({
                where: query,
                include: [db.Agent]
            }).then(function(dbMission) {
                res.json(dbMission);
            });
        }
    });

    // Get rotue for retrieving a single Mission
    app.get("/api/mission/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Agent
        db.Mission.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Agent]
        }).then(function(dbMission) {
            res.json(dbMission);
        });
    });

    // Mission route for saving a new Mission
    app.post("/api/mission", function(req, res) {
        db.Mission.create(req.body).then(function(dbMission) {
            res.json(dbMission);
        });
    });

    // DELETE route for deleting mission
    app.delete("/api/mission/:id", function(req, res) {
        db.Mission.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbMission) {
            res.json(dbMission);
        });
    });

    // PUT route for updating mission
    app.put("/api/mission", function(req, res) {
        db.Mission.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbMission) {
            res.json(dbMission);
        });
    });
};