function alert(req, callback) {
    // create filter based on request (req)
   readElasticDocs(esclient,{index:'logstash-2017.05.30',type:'logs'}, function (err, doc) {
                   if (err) { 
                       console.log(err);
                       setTimeout(alert, 3000, req, callback);
                } else {
                       callback(doc);
                   }
                });
}

module.exports=alert;