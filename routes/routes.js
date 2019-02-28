// routes.js
var fs = require("fs");
var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Ever wonder where jennifer is?");
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
  })

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
  })
}

module.exports = appRouter;
