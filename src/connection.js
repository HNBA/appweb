var elasticsearch=require('elasticsearch');
<<<<<<< HEAD
var login_pwd=require('./path.js');
=======
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03

var client = new elasticsearch.Client( {
  hosts: [
    'aziz:azerty@localhost:9200',
   //'localhost:9200',
<<<<<<< HEAD
console.log(login_pwd.login)
=======
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
  ]
});

module.exports = client;
