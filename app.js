// app.js
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://jennifer.minhyukpark.com");
  res.header("Access-Control-Allow-Origin", "https://chess.minhyukpark.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes(app);

var server = app.listen(7978, function () {
    console.log("app running on port.", server.address().port);
});
