var elasticClient = require('./connection.js');
var addIndex=require('./addElasticAlertIndex.js');


var now=new Date();
var annee=now.getFullYear();
var mois=now.getMonth()+1;
var jour=now.getDate();
var heure=now.getHours();

  if (jour < 10)
     {
 var index="logstash-"+annee+".0"+mois+".0"+jour+"" ;
 var ldate=annee+".0"+mois+".0"+jour+"" ;
     }
  else
     {
      var index="logstash-"+annee+".0"+mois+"."+jour+"" ;
       var ldate=annee+".0"+mois+"."+jour+"" ;
     }


addIndex(elasticClient, {"index":index ,"type":"Alerte","object":"cpu superieur à 20","logdate":now}, function (error, doc){
})




