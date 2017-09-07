var express = require("express");
//var bodyParser = require("body-parser");
var request=require('request');

//var app = express();

//var PORT = process.env.PORT || 8080;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.text());
//app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);
//app.listen(PORT, function() {
  //console.log("App listening on PORT: " + PORT);
//});



var app=express();
app.use('/',function(req,res){
  var url = apiServerHost+req.url;
  req.pipe(request(url)).pipe(res);
});

app.listen(process.env.PORT || 8080);

