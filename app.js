// app.js
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

var allowedOrigins = ['https://jennifer.minhyukpark.com', 'https://chess.minhyukpark.com', 'https://musictude.minhyukpark.com', 'https://api.minhyukpark.com'];
var corsOptions = {
    origin: function(origin, callback) {
        console.log(origin);
        if(allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET, POST, OPTIONS",
    optionsSuccessStatus: 204,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, roomcode"
}

app.use(cors(corsOptions));
//app.options('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.use(function(req, res, next) {
  return next();
});
*/

routes(app);

var server = app.listen(7978, function () {
    console.log("app running on port.", server.address().port);
});
