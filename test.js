var config = require('./src/config-admin-tools');
var http        = require('http');
var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var server = http.createServer(app);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function (req, res) {
  res.send('Hello World!');
});



server.listen(process.env.PORT , function () {
  console.log('Example app listening on port' + process.env.PORT );
});

var json_test = {
    "name" : "Config Admin Tools",
    "description" : "Handy Tool to administrate your json of MongoDB Config files online",
    "version" : "0.0.1",
    "level 1" : {
        "property" : "property of level 1",
        "level 2" : {
            "property" : "property of level 2",
            "level 3" : {
                "property" : "property of level 3"
            },
        },
    },
    
    
}

config.init({
    username: "bens",
    password: "123",
    server: app,
    debug: true,
    configFiles: "./config"
});



