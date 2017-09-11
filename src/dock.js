//Load express module with `require` directive

//Define request response in root URL (/)

(function() {
var express=require('express'),
    fs = require('fs'),
    path=require('path');

const app = express();
var http = require('http');

const server = http.createServer(app);

var request = require("request");
var url_1 = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
    "key=d99803c970a04223998cabd90a741633" +
    "&stop_id=it";
    //var WebSocketServer = require('websocket').server;



app.use('/test', function (req, res, next) {
  console.log('hello world');
  res.write(JSON.stringify("hello world !! "));

  res.end();
});




//Launch listening server on port 8081
server.listen(80, function () {
      console.log('Example app listening on port 80!');
});




})();


