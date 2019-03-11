// routes.js
var fs = require("fs");
var prometheus_cred = require('../prometheus_cred.json');
var monitor_cred = require('../monitor_cred.json');
var office_cred = require('../office_cred.json');
var MongoClient = require('mongodb').MongoClient;
const auth = require('express-basic-auth');
var g_client = null;
MongoClient.connect('mongodb://localhost:27017/music', (err, client) => {
    g_client = client;
});

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("central api for lots of things");
  });

  app.get("/isjenniferhere", function (req, res) {
    fs.readFile(__dirname + "/../" + "jennifer.json", "utf8", function (err, data) {
	console.log(__dirname + "/" + "jennifer.json");
	data = JSON.parse(data);
        res.status(200).send(JSON.stringify(data));
    });
  });
	
  app.post('/isjenniferhere', function (req, res) {
    fs.readFile(__dirname + "/../" + "jennifer.json", "utf8", function (err, data) {
      data = JSON.parse( data );
      data["current"] = req["body"]["current"];
      data = JSON.stringify(data)
      fs.writeFile(__dirname + "/../" + "jennifer.json", data, "utf8", function (err, data) {
      });
      res.status(200).send(data);
    });
  });

  app.get("/chess", function (req, res) {
    fs.readFile(__dirname + "/../" + "chess.json", "utf8", function (err, data) {
	console.log(__dirname + "/" + "chess.json");
	data = JSON.parse(data);
        res.status(200).send(JSON.stringify(data));
    });
  });
	
  app.post('/chess', function (req, res) {
    fs.readFile(__dirname + "/../" + "chess.json", "utf8", function (err, data) {
      data = JSON.parse( data );
      data["FEN"] = req["body"]["FEN"];
      data = JSON.stringify(data)
      fs.writeFile(__dirname + "/../" + "chess.json", data, "utf8", function (err, data) {
      });
      res.status(200).send(data);
    });
  });

  app.get("/music", async function (req, res) {
      var root_db = g_client.db("music");
      const rooms = root_db.collection("rooms");
      var data = await rooms.find({"roomcode" : req.get("roomcode")}).toArray();
          //data = JSON.parse(data);
      res.status(200).send(data);
  });

  app.post('/music', async function (req, res) {
      var root_db = g_client.db("music");
      const rooms = root_db.collection("rooms");
      // var data = await rooms.find({"roomcode" : req["body"]["roomcode"]}).toArray();
      var new_data = req["body"];
      delete new_data["_id"];
      console.log("after deletion" + new_data);
      //data = JSON.parse(data);
      rooms.replaceOne({"roomcode": req["body"]["roomcode"]}, new_data);
      res.status(200).send(new_data);
  });

  app.post('/music/create', function (req, res) {
      //MongoClient.connect('mongodb://localhost:27017/music', (err, client) => {
      var root_db = g_client.db("music");
      const rooms = root_db.collection("rooms");
      var data = req["body"];
      //data = JSON.parse(data);
      rooms.insertOne(data);
      res.status(200).send(data);
          //client.close();
      //});
  });

  /* auth */
  app.get('/auth-prometheus', auth({
    users: prometheus_cred,
    challenge: true,
    realm: 'credentials for prometheus.minhyukpark.com'
  }));

  app.get('/auth-prometheus', function(req, res) {
    res.status(200).send("authorized");
  });

  app.get('/auth-monitor', auth({
    users: monitor_cred,
    challenge: true,
    realm: 'credentials for monitor.minhyukpark.com'
  }));

  app.get('/auth-monitor', function(req, res) {
    res.status(200).send("authorized");
  });

  app.get('/auth-office', auth({
    users: office_cred,
    challenge: true,
    realm: 'credentials for office.minhyukpark.com'
  }));

  app.get('/auth-office', function(req, res) {
    res.status(200).send("authorized");
  });
  /* auth end */
}

module.exports = appRouter;
