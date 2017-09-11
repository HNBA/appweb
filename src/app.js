'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var path = require('path');
var http = require('http');
 
var app = express();
var port = 4747;
 
app.set('views', path.join(__dirname, 'images'));
app.set('view engine', 'html');
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(bodyParser.json());
app.use(cookieParser());
 
/*CORS middleware */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
 
app.use(nocache);
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));
 
function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}
require('./serverRoute')(app);
 
app.listen(port);
 
console.log("server running on " + port);
