// Load Up the Dependencies
var express = require('express');
var bodyParser = require('body-parser');

// Routes.
var routes = require('./src/routes')

//Configuring the Express Middleware
app = express();

app.use(express.static(__dirname));

//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 5000;

//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/dist'));

//Set RESTful routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/cluster', function(req, res) {
  res.sendFile(__dirname + '/home.html');
});


/**
 * Routing to routes.js file
 */
app.use('/', routes);

module.exports = app;

// Start the server
app.listen(port);
console.log("Server has booted up successfully at PORT : " + port);
