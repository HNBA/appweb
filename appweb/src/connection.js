var elasticsearch=require('elasticsearch');
var login_pwd=require('./path.js');

var client = new elasticsearch.Client( {
  hosts: [
    'aziz:azerty@localhost:9200',
   //'localhost:9200',
console.log(login_pwd.login)
  ]
});

module.exports = client;
