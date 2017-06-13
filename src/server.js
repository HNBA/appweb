(function() {


//var spawn=require ('child_process').spawn;
//spawn('ng',['serve','--allowJs']);
//start();

//function start() {


    var express = require('express');
    var proxy = require('express-http-proxy');

    var http = require('http');
    var request = require("request");
    var url_1 = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
    "key=d99803c970a04223998cabd90a741633" +
    "&stop_id=it"
    //var WebSocketServer = require('websocket').server;
    const app = express();
    const server = http.createServer(app);
    app.use('/', proxy('localhost:4200', {
         forwardPath: function(req, res) {
            console.log(require('url').parse(req.url).path);
            return require('url').parse(req.url).path;
         }}));

    server.listen(3000, function () {
        console.log('Example app listening on port 3000!');
    });

     attachWS(server);

//}


function attachWS(server) {
    var alert=require('./alert.js');
    var elasticsearch=require('elasticsearch');
    var esclient=new elasticsearch.Client( {
      hosts: [
        'admin:trainees@213.32.115.155:9200'
      ]
    });
    
    var readElasticDocs=require('./readElasticDocs.js');
    var fs=require('fs');
    var WebSocket=require('ws');
    var URL=require('url').URL;
    var channel=require('./channel');
    var WebSocketServer = WebSocket.Server
    , wss = new WebSocketServer({server:server //,
	//	ssl: true,
	//	ssl_key: '/opt/appweb/ssl/server.key',
          //      ssl_cert: '/opt/appweb/ssl/server.crt'
	 });
    wss.on('connection', function(ws, req) {
        console.log('connection');
     //   var urlquery=new URL(req.headers.origin+req.url);
       // console.log(urlquery);
	try {
		var ch=new channel(ws);
		ch.receive(function (req) {
		    switch (req.service) {
            case 'alert':
                alert(req, function (doc) { ch.send({service:'alert', doc:doc})});
            case 'logs':
                console.log('request for service logs');
               // create filter based on request (req)
               readElasticDocs(esclient,{index:'logstash-2017.06.08',type:'logs'}, function (err, doc) {
                   if (err) { console.log('error')}
                   else {
                       console.log('send log');
                       ch.send({service:'logs', doc:doc});
                       throw(Error('yizzi'));
                   }
                });
            case 'sineWave': 
                console.log('service sineWave');
                ch.send({service:'sineWave', value:observableSineWave()});
                break;
            case 'time': ch.send({time:new Date()});
               break;
			case 'get':  
                console.log('received get request');
                console.log(req);
                
					    fs.readFile(req.filename, 'utf8', function (err, data) {
						if (err) {
						    ch.send({service:'time', filename: req.filename, error: err});
						} else {
                                                    ch.send({service:'time', filename: req.filename, data:data});
						}
					    });
			    break;
			case 'event':
			    break;
			default:
                            ch.send({error:'unknown service', service:req.service});
			    console.log('error: unknown service '+JSON.stringify(req));
			}
		    });
		ch.socket.on('close',function (e) {
		    console.log('delete channel');
		    delete ch;
		});
	} catch (err) {
		delete ch;
		throw(err);
    }
  });
}








    function deg2rad(val) {
      return val + 19;
    }

    function observableSineWave() {
        let val=12;
    return val+1;
        }
})();
