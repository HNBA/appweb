const URL = require('url').Url;
console.log(URL);
var fs = require('fs')
  , http = require('http')
  , app = http.createServer(handlerHttp);

app.listen(80);
attachWS(app);

function handlerHttp (req, res) {
  console.log(req.method+' '+req.url);
  var options = {
      host: "localhost",
      path: req.url,
      port: 3000,
      method: req.method
  };
  callback = function(response) {
      response.on('data', function (chunk) {
        //console.log(chunk);
        res.write(chunk);
      });
      response.on('end', function () {
        res.end();
      });
  }

  var myreq = http.request(options, callback);
  myreq.on('error', function (err) {
            res.writeHead(500);
            res.end(err.toString());
        });
  req.on('data', function (chunk) {
        myreq.write(chunk);
  });
  req.on('end', function () {
       myreq.end();
   });
}

function attachWS(server) {
    var WebSocket=require('ws');
   console.log(WebSocket); 
   var channel=require('./channel');
    var WebSocketServer = WebSocket.Server
    , wss = new WebSocketServer({server:server //,
               // ssl: true,
              //  ssl_key: '/opt/appweb/ssl/server.key',
               // ssl_cert: '/opt/appweb/ssl/server.crt'
         });
    wss.on('connection', function(ws, req) {
       //console.log(ws);
       var ch=new channel(ws);
       var WebSocketClient = require('websocket').client;
       var client = new WebSocketClient();
       client.on('connectFailed', function(error) {
          console.log('Connect Error: ' + error.toString());
        });
       client.on('connect', function(cc) {
          var cch=new channel(cc);
          ch.receive(function (data) { cch.send(data); });
          cch.receive(function (data) { ch.send(data) });
        });
       client.connect('ws://localhost:3000'); //+ws.url);
    });

/*

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function incoming(data) {
  console.log(data);
});
*/


}
