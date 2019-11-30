var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var route = require('./routes/routes');
var cors = require('cors');

var dbUtils = require('./db/database');
var itunesService = require('./services/itunesService');

// consts
var MONGO_URL = 'mongodb://localhost:27017';

var app = express();

// config app to use post api
app.use( bodyParser.json());
// app.use( bodyParser.options());aa
app.use(express.static(__dirname + "/src"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// set up to db
dbUtils.setupDB(MONGO_URL, function (p_db) {
    route.configRoutes(app, dbUtils);

    // create the server
    var server = http.createServer(app);

    // listen for requests
    server.listen(9000, null, null, function () {
        console.log("Express server listening on port 9000");
    });
});