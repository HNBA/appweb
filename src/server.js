(function() {
//var spawn=require ('child_process').spawn;
//spawn('ng',['serve','--allowJs']);
start();
function start() {


var report={current:{node0:null,node1:null,node2:null,webserver:null}, history:{node0:[], node1:[], node2:[],webserver:[]}};
var arep={current:{critical:null,warningg:null},history:{critical:[],warningg:[]}};
var srep={current:{report:null},history:{report:[]}};
console.log('start');
var fs = require('fs');
var ini = require('ini');
var util = require('util');
 
var file = fs.readFileSync('./config.ini', 'utf-8');
 
//Création d'un JSON à partir du fichier ini '
var config = ini.parse(file);
 
// Arbre JSON -> cnsole
console.log(util.inspect(config));


var elasticsearch=require('elasticsearch');
var esclient=new elasticsearch.Client( {
      hosts: [
        config.elasticsearch.login_es+":"+config.elasticsearch.pwd_es+"@"+config.elasticsearch.ip_host+":"+config.elasticsearch.port
      ]
    });

var readElasticDocs=require('./readElasticDocs.js');
var addIndex=require('./addElasticAlertIndex.js');

var now=new Date();
var minutes=now.getMinutes();
var annee=now.getFullYear();
var mois=now.getMonth()+1;
var jour=now.getDate();
var heure=now.getHours()+2;
var index=jour<10?"logstash-"+annee+".0"+mois+".0"+jour+"" :"logstash-"+annee+".0"+mois+"."+jour+"" ;
var ldate=jour<10?annee+".0"+mois+".0"+jour+"":annee+".0"+mois+"."+jour+"";

var express=require('express'),
    path=require('path');
 
var formidable = require('formidable');
var FCM = require('fcm-node');
var serverKey="AAAAH1KsIgY:APA91bFIdvkMaDHlE0XiPbLcH1b85rZqjlWnSlpkyVw_p71vtVm3UNLcq2E8YFDtfRzQuH20Bb36e1q5SNihxW2buodSucsaSfFXs9ZOFy_mktM0N-zM5eOBalgZkml_KUuYURId0836"
var fcm = new FCM(serverKey);
var assert = require('assert');

var proxy = require('express-http-proxy');
var http = require('http');
var request = require("request");
var url_1 = "http://developer.cumtd.com/api/v2.2/json/GetStop?" +
    "key=d99803c970a04223998cabd90a741633" +
    "&stop_id=it";
    //var WebSocketServer = require('websocket').server;
const app = express();

const server = http.createServer(app);


app.use('/getreport', function (req, res, next) {
  console.log('getreport');
  res.write(JSON.stringify(report.current));

  res.end();
});


app.use('/getalert', function (req, res, next) {
  console.log('getalert');
  res.write(JSON.stringify(arep.current));
  res.end();

});

app.use('/getalerthist', function (req, res, next) {
  console.log('getalert history');
  res.write(JSON.stringify(arep.history));
  res.end();
});

app.use('/getsshrep', function (req, res, next) {
  console.log('getsshrep');
  res.write(JSON.stringify(srep.current));
  res.end();
});

app.use('/gethistoryssh', function (req, res, next) {
  console.log('gethistorySsh');
  res.write(JSON.stringify(srep.history));
  res.end();
});

app.use('/gethistory', function (req, res, next) {
  console.log('gethistory');
  res.write(JSON.stringify(report.history));
  res.end();
});

app.get('/sendFcmNotification',function (req,res){
notify(req,res);
});




var ldap = require('ldapjs');

var ldapClient = ldap.createClient({
    url: 'ldap://'+config.ldap.host_ldap+':'+config.ldap.port_ldap
});
var basedn="cn=Users,dc=trainees,dc=ddns,dc=net";

app.post('/login', function(req, res) {
              req.on('data', function (data) {
                var u=JSON.parse(data);
              console.log('login '+u.username+' '+u.password); 
              ldapClient.bind("cn="+u.username+","+basedn, u.password, function(err) {
                 if (err != null) {
                    console.log('failed, username='+u.username);
                    res.end('false');
                 } else {




                    var now=Date.now();
                    var ip=req.connection.remoteAddress;
                    var id=now; //ip+"_"+now; //hashCode(rand()+"_"+ip+"_"+new Date().now());
                    res.writeHead(200, {'Set-Cookie': 'session='+id});
                    res.end('true');
                    console.log('ok return true');
            }
               });
        
 });

});
app.use('/', proxy('localhost:4200', {
           forwardPath: function(req, res) {
         //     console.log(require('url').parse(req.url));
              return require('url').parse(req.url).path;
         }
}));

server.listen(80, function () {
      console.log('Example app listening on port 80!');
});

attachWS(server);


  

function attachWS(server) {
    var alert=require('./alert.js');
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
             try {
		var ch=new channel(ws);
		ch.receive(function (req) {
	        switch (req.service) {
               case 'chart':
               //console.log(index);
               readElasticDocs(esclient,{"index":"elastalert_status" ,"type":"elastalert_status"}, function (err, doc,res) {
               //console.log(doc);
               var data=req.body;
               var topic1='/topics/news';
               var title="DigitSTORY Notification";
               var message="New Session Opened by User";
              var token=["eDYTJbsaDtA:APA91bEt8mtv1pACxmLIp2ynkinrUxb4WNUfKnjoZYmoVkiHBpi-c6kNO4Qdi7W4a3jqxBGVcir_CKRacdHSUCaSC6JQWpX6rCZ3Z_Z5DrPw8jn656J5XtjobZGHSZfSOeqrVQuFxjCz"];
              fcm.subscribeToTopic([ 'token' ], 'news', (err, res) => {
              assert.ifError(err);
              assert.ok(res);
              //done();
              });

             var message = {
                 to: topic1,
                  notification: {
                                       title: "Warning", //title of notification
                                       body: message, //content of the notification
                                       sound: "default",
                                       icon: "ic_launcher" //default notification icon
                                       },

                 data: data  //payload you want to send with your notification
                } ;
                 
                    fcm.send(message, function(err, response){
                         if (err) {
                            console.log(err);
                            //res.json({success:false})
                         }
                         else
                         {
                           console.log("Successfully sent with response: ",response);
                           //res.json({success:true})
                           console.log(message.notification);
                         }
                     });
                
               switch (doc.plugin) {
	                                     case "cpu":

                                        switch(doc.type_instance){
                                        case "system": 
					//  console.log('chart.cpu.system:'+doc.value.toFixed(2));
                                          ch.send({service:'chart', doc:doc});
	       			
                                      break;}                                         
                                    }
               }); break;
              case 'disklog':

              readElasticDocs(esclient,{"index":index ,"type":"logs"}, function (err, doc) {
                switch (doc.plugin) {
                                      case "disk":
                                         setTimeout(function(){ch.send({service:'disklog', doc:doc});},1000);
                                      break;
                 }
              });
                          break;
                            case 'logs':
              			 console.log('request for service logs');
           		                // create filter based on request (req)
           		         readElasticDocs(esclient,{"index":index ,"type":"logs"}, function (err, doc) {
		                 switch (doc.plugin) {
                             		 case "cpu":
                                		//setTimeout(ch.send,4000,{service:'logs', doc:doc});
                            	             switch (doc.type_instance){
                                               case "system":
                                               if (doc.value >1) {
                                               setTimeout(function(){ch.send({service:'logs', doc:doc});},1000);
                                               //console.log("*** Critical Cpu alert !! avec valeur "+doc.value);
                                              addIndex(esclient,
                                                  {"index":index ,"type":"critical","object":"cpu superieur à 10","logdate":now},
                                                  function (error, doc) {
                                                  if (error) console.log(error);
                                                 // console.log(doc); 
			                        });
	                                       } else {
				     
                                                if (doc.value >4 && doc.value<8)
						 {   //console.log("--- warning  Cpu alert !! avec valeur "+doc.value);
                                               addIndex(esclient,
                                                {"index":index ,"type":"warningg","object":"cpu value entre 7 et 10 ","logdate":now}, 
                                                function (error, doc) {
                                                if (error) console.log(error);
                                              //  console.log(doc);
						})
                                                setTimeout(function(){ch.send({service:'logs', doc:doc});},1000);	
				                 }
					    break;}
                                           break;}

                                }});

                 case 'sshlogso' :
                                    //console.log('request for service logs');
                                                                            // create filter based on request (req)
                                 readElasticDocs(esclient,{"index":index ,"type":"log"}, function (err, doc) {
                            //if (doc.user=="abdelaziz" )
                               if (doc.user!="")
 {                                // console.log(doc.user);
                                 switch (doc.status) {
                                   case "opened":
                                     //console.log(doc.user);
                                     //console.log(doc.status);
                                     //console.log(doc.host);
                                     //console.log(doc.logdate);
                                     //console.log("-----------");
                                    // setTimeout(function(){ch.send({service:'sshlogso', doc:doc});},10000);  
                                      ch.send({service:'sshlogso', doc:doc});
       
                                          var data=req.body;
                                          var title="DigitSTORY Notification";
                                          var message="New Session Opened by User"+doc.user+""+doc.host+"  "+heure+"h:"+minutes+"min" ;
                                       var token="ce0apjmjFT0:APA91bGsnqJyzHuq9wz-IFE8K8MPpq1jjW2wUDhFXVBSs7JUQjkUJEaFVHvI5PSd34Kt9iyP5U0xHSR4-7Hrh7oBfKUSBcKeZOFiURkccrquIKPiXqNdHk3acQOBOgJ4PZNO1FtgL9OM"

                                          var message = {
                                          to: token,
                                          notification: {
                                          title: "Warning", //title of notification
                                          body: message, //content of the notification
                                          //sound: "default",
                                          //icon: "ic_launcher" //default notification icon
                                          },
                                          data: data  //payload you want to send with your notification
                                          } ;
                                             // if (doc.status=="opened")

                                                   fcm.send(message, function(err, resp){
                                                      if (err) {
                                                      console.log(err);
                                                      //res.json({success:false})
                                                      }
                                                      else
                                                      {
                                                      console.log("Successfully sent with response: ",resp);
                                                      res.json(message.notification.body)
                                                     // console.log(message.notification);
                                                      }
                                                   });



                                               addIndex(esclient,
                                                 {"index":index ,"type":"warningg","object":"New User connected via SSH sur le serveur ","logdate":now},
                                                 function (error, doc) {
                                                  if (error) console.log(error);

                                               }); 
                                  case "closed":
                                       console.log("session !! ");
                                      console.log(doc.status);
                                      console.log(doc.logdate);
                                      console.log("---------");  
                                  break; 
                                  }
  }
 });
             case 'memorylogs':
                                    console.log('request for service logs');
                                       // create filter based on request (req)
                                 readElasticDocs(esclient,{"index":index ,"type":"logs"}, function (err, doc) {

                                     switch (doc.plugin) {

                                 case "memory":
                                           switch (doc.type_instance){

                                               case "used":
                                               if (doc.value >90) {
                                               setTimeout(function(){ch.send({service:'memorylogs', doc:doc});},10000);
                                               addIndex(esclient,
                                                 {"index":index ,"type":"critical","object":"Memoire utilise sature ","logdate":now},
                                                 function (error, doc) {
                                                  //if (error) //console.log(error);
                                                });
                                               }
                                               else
                                                  {
                                                  }
                                             break;}
 }});
                  case "log": 
              readElasticDocs(esclient,{"index":index ,"type":"logs"}, function (err, doc) {
                  switch (doc.status)  {
                    case "opened":
                        setTimeout(function(){ch.send({service:'logs', doc:doc});},10000);
                       //ch.send({service:'log', doc:doc});
                    break;
                   } 
               });
            case 'time': ch.send({time:new Date()});
               break;
			case 'get':  
                console.log('received get request');
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



readElasticDocs(esclient, {"index":index , "type":"log"  }, function (error, doc) {
        if (error) {
           console.log(error);
                }
        else {
   
  switch(doc.status) {
    case "closed":
	var now=new Date();
	var annee=now.getFullYear();
	var mois=now.getMonth()+1;
	var jours=now.getDate();
	var heures=now.getHours()+2;
	var minutes=now.getMinutes();
	var d="0"+jours+"/0"+mois+"-"+heures+"h-"+minutes+"min";
	srep.current.report={status: doc.status , host : doc.host , dated : d };
	srep.history.report.push(srep.current.report);  
   break;
   case "opened":
     var now=new Date();
     var annee=now.getFullYear();
     var mois=now.getMonth()+1;
     var jours=now.getDate();
     var heures=now.getHours()+2;
     var minutes=now.getMinutes();
     var d="0"+jours+"/0"+mois+"-"+heures+"h-"+minutes+"min";
   
       if (doc.user != "root" &&  doc.user != "" &&  doc .user!=undefined)
     {
         srep.current.report={status: doc.status , user : doc.ruser, host : doc.host , dated : d };
         srep.history.report.push(srep.current.report);
     }
    break; }
             }
});
readElasticDocs(esclient, {"index":index , "type":"logs"  }, function (error, doc) {
     if (error) {
           console.log(error);
                }
  else {



                                switch(doc.plugin){
                                   case "cpu": 

					switch(doc.type_instance){
                                         case "system":
                                            switch (doc.host){
                                               case "webserver":

          

			        	 	 report.current.webserver={type_instance: doc.type_instance, value: doc.value.toFixed(2), Host: doc.host};
				         	 report.history.webserver.push(report.current.webserver);  
 				                break;
                                                   case "node-1": 
                                                 report.current.node1={type_instance: doc.type_instance, value: doc.value.toFixed(2), Host: doc.host};
                                                 report.history.node1.push(report.current.node1);
                  				 break;
                                                 case "node-0":
                                                 report.current.node0={type_instance: doc.type_instance, value: doc.value.toFixed(2), Host: doc.host};
                                                 report.history.node0.push(report.current.node0);
                                                 break;
               				          case "node-2":
                                                 report.current.node2={type_instance: doc.type_instance, value: doc.value.toFixed(2), Host: doc.host};
                                                 report.history.node2.push(report.current.node2);



 
                                        
                                              }
                                         }
			           
                      
                            
                               }
   }
});


readElasticDocs(esclient, {"index":index , "type":"critical"  }, function (error, doc) {
     if (error) {
           console.log(error);
                }
     else {
        arep.current.critical={type: doc.type ,object: doc.object, date : doc.logdate};
        arep.history.critical.push(arep.current.critical);
          }
});


readElasticDocs(esclient, {"index":index , "type":"warningg"  }, function (error, doc) {
     if (error) {
           console.log(error);
                }
  else {

       arep.current.warningg={type: doc.type ,object: doc.object, date : doc.logdate};
       arep.history.warningg.push(arep.current.warningg);
      }
});



}
})();
