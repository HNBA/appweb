(function() {
 
 
//var spawn=require ('child_process').spawn;
//spawn('ng',['serve','--allowJs']);
//start();
 
//function start() {
 
 
 
var report={current:{cpu:null}};
 
//var report={current:{cpu:"["+null+"]",memory:null,disk:null}, history:{cpu:[], memory:[], disk:[]}};
    var elasticsearch=require('elasticsearch');
    var esclient=new elasticsearch.Client( {
      hosts: [
        'admin:trainees@213.32.115.155:9200'
      ]
    });
    var readElasticDocs=require('./readElasticDocs.js');
 
 
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
app.use('/getreport', function (req, res, next) {
  console.log('getreport');
  res.write(JSON.stringify(report.current));
  res.end();
});
    app.use('/', proxy('localhost:4200', {
         forwardPath: function(req, res) {
            console.log(require('url').parse(req.url).path);
            return require('url').parse(req.url).path;
         }}));
 
    server.listen(80, function () {
        console.log('Example app listening on port 80!');
    });
 
     attachWS(server);
 
//}
 
 
function attachWS(server) {
    var alert=require('./alert.js');
    var fs=require('fs');
    var WebSocket=require('ws');
    var URL=require('url').URL;
    var channel=require('./channel');
    var WebSocketServer = WebSocket.Server
    , wss = new WebSocketServer({server:server //,
//  ssl: true,
//  ssl_key: '/opt/appweb/ssl/server.key',
//      ssl_cert: '/opt/appweb/ssl/server.crt'
     });
    wss.on('connection', function(ws, req) {
        console.log('connection');
 
var now=new Date();
var annee=now.getFullYear();
var mois=now.getMonth()+1;
var jour=now.getDate();
var heure=now.getHours();
 
  if (jour < 10)
     {
       var index="logstash-"+annee+".0"+mois+".0"+jour+"" ;
     }
  else
     {
       var index="logstash-"+annee+".0"+mois+"."+jour+"" ;
     }
 
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
               readElasticDocs(esclient,{"index":index ,"type":"logs"}, function (err, doc) {
                      switch (doc.plugin) {
                           
                            case "cpu":
                                   switch (doc.type_instance){
 
                                   case "system":
                                          if (doc.value >13)
 {   console.log("****************************PUSH NOTIF Erreur SYSTEM CPU System***************");
//console.log(doc.value);
ch.send({service:'logs', doc:doc});
}else{}
break;
 
 
 
                                   case "user":
                                          if (doc.value <0)
{   console.log("*******************************PUSH NOTIF  Erreuur USER CPU User*****************");
console.log(doc.value);
ch.send({service:'logs', doc:doc});
}
else {}
break;
 
 
//                               case "interrupt":
//                                        if (doc.value !==0)
//  console.log("****************************PUSH NOTIF Interrupt CPU*****************");
//console.log(doc.value);
//ch.send({service:'logs', doc:doc});
//break;
//                               case "nice":
//                                        if (doc.value >1)
//console.log("*****************************PUSH NOTIF Nice CPU*****************");
//console.log(doc.value);
//ch.send({service:'logs', doc:doc});
//break;
//                                 case "softirq":
//                                          if (doc.value >1.5)
// console.log("*******************************PUSH NOTIF Softirq CPU*****************");
//console.log(doc.value);
//ch.send({service:'logs', doc:doc});
//break;
            };break;
                       
                                case "memory":
                                 break;                                              }
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
var now=new Date();
var annee=now.getFullYear();
var mois=now.getMonth()+1;
var jour=now.getDate();
var heure=now.getHours();
 
  if (jour < 10)
     {
       var index="logstash-"+annee+".0"+mois+".0"+jour+"" ;
     }
  else
     {
       var index="logstash-"+annee+".0"+mois+"."+jour+"" ;
     }
 
 
readElasticDocs(esclient, {"index":index , "type":"logs"  }, function (error, doc) {
     if (error) {
           console.log(error);
                }
  else {
     switch (doc.plugin) {
        case "cpu":
          report.current.cpu={ type_instance: doc.type_instance, value: doc.value, Host: doc.host};
               
// report.history.cpu.push(report.current.cpu);
         break;
//       case "memory":
//break;
//       report.current.memory={name: doc.plugin, type_instance: doc.type_instance, value: doc.value, Host: doc.host};
//     break;
//       case "disk":
//       report.current.disk={name: doc.plugin, type_instance: doc.type_instance, value: doc.value, Host: doc.host};
//       break;
 
default:
         break;
     }
       ;
    }
});
    function deg2rad(val) {
      return val + 19;
    }
 
    function observableSineWave() {
        let val=12;
    return val+1;
        }
})();
