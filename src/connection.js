var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {
  hosts: [
    'aziz:azerty@localhost:9200',
   //'localhost:9200',
  ]
});

module.exports = client;
