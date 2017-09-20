var db = require("../models");

module.exports = function(app) {
    app.get("/api/agent/", function(req, res) {
        db.Agent.findAll({
            include: [db.Mission]
        }).then(function(dbAgent) {
            res.json(dbAgent);
        });
    });

    app.post("/api/agent", function(req, res) {
        db.Agent.create(req.body).then(function(dbAgent) {
            res.json(dbAgent);
        });
    });

    app.delete("/api/agent/:id", function(req, res) {
        db.Agent.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbAgent) {
            res.json(dbAgent);
        });
    });

};