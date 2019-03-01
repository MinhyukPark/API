// app.js
var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  var allowedOrigins = ['https://jennifer.minhyukpark.com', 'https://chess.minhyukpark.com']
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  return next();
});

routes(app);

var server = app.listen(7978, function () {
    console.log("app running on port.", server.address().port);
});
