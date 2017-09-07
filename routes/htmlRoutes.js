var path = require("path");

module.exports = function(app) {
  app.get("/skyBio", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/skyBio.html"));
  });
  app.get("/facePlusPlus", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/facePlusPlus.html"));
  });
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
