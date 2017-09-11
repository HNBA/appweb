var express=require('express'),
    fs = require('fs'),
    path=require('path');
var http = require('http');
var elasticsearch=require('elasticsearch');
var esclient=new elasticsearch.Client( {
      hosts: [
        'admin:trainees@213.32.115.155:9200'
      ]
    });
var readElasticDocs=require('./readElasticDocs.js');

const app = express();
const server = http.createServer(app);

var formidable = require('formidable');
var FCM = require('fcm-node');
var serverKey="AAAArfgEPEI:APA91bEFBVq28Vor84ZW8MZ2kma5KDBWq7iY7wn6j2GyldF_P4hlEbhcsFwkVZ7XD2FCIlOmw4RcBbxDk4eIsraHLinDZ5SoF-04hLoGWcR1ztUlVq0QWOSwFfEXfFrzaMwj_TO6uh_K"; //You will find this in your firebase console
var fcm = new FCM(serverKey);
server.listen(80, function () {
        console.log('Example app listening on port 80!');
    });

//To get server key Select your project > Click the Gear icon(Settings) > Move to 'Cloud Messaging' tab .
//Under Project credentials your will get your so called long 'Server Key'
 
module.exports=function(app){
  app.get('/sendFcmNotification',function (req,res){
    var WebSocket=require('ws');
    var URL=require('url').URL;
    var channel=require('./channel');
    var WebSocketServer = WebSocket.Server
    , wss = new WebSocketServer({server:server});
    
     wss.on('connection', function(ws, req) {
        console.log('connection');

    try {
                var ch=new channel(ws);
          ch.receive(function (req) 
           {
               readElasticDocs(esclient,{"index":index ,"type":"logs"}, function (err, doc) 
               {
                console.log(doc.plugin);
   
               });
            })
        }catch (err)
              {
                delete ch;
                throw(err);
              }

         })
    var data=req.body;
    var message="Hey! you got this notification.";
    var title="DigitSTORY Notification";
    var token="ce0apjmjFT0:APA91bGsnqJyzHuq9wz-IFE8K8MPpq1jjW2wUDhFXVBSs7JUQjkUJEaFVHvI5PSd34Kt9iyP5U0xHSR4-7Hrh7oBfKUSBcKeZOFiURkccrquIKPiXqNdHk3acQOBOgJ4PZNO1FtgL9OM";
    var message = { 
        to: token, 
        notification: {
            title: title, //title of notification 
            body: message, //content of the notification
            sound: "default",
            icon: "ic_launcher" //default notification icon
        },
        data: data //payload you want to send with your notification
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Notification not sent");
            res.json({success:false})
        } else {
            console.log("Successfully sent with response: ", response);
            res.json({success:true})
        }
    });
 
  });
}
