var addIndex = function (client, options, callback) {
// console.log('addElasticIndex');
 var client = require('./connection.js');
 

if (options.index==undefined || options.type==undefined ) {
            callback(Error('index and type must be defined'),'d');
    } else {
 client.index({index: options.index, type:  options.type,
                  body: { object: options.object,logdate: options.logdate}}, function(err,resp,status) {
     if(err) {
        console.log(err);
      } else {
//          console.log("create",resp, status);
       }
  });

  }              
}

module.exports=addIndex;

