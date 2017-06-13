/*var http=require('http');
var req=http.request({host:'stockmarket.streamdata.io', path:'/prices'}, function (response) {
    console.log(response);
});
req.on('error', function (err) {
  console.log(err);
}); 
var request = require('request');
request({'url':'http://stockmarket.streamdata.io/prices',
        'proxy':'http://hazem_belkhiria:C%40rrefour17@10.49.64.5:8080'}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var json = JSON.parse(body);
        var data_length = json.length;
        console.log(data_length);
        for (var i = 0; i < data_length; i++) 
    {
         console.log(json[i]["title"] + " " + json[i]["price"]);
    }
    }
})*/
/*var HttpsProxyAgent = require('https-proxy-agent');
var request = require('request');
request({'url':'http://stockmarket.streamdata.io/prices',
        'proxy':'http://hazem_belkhiria:C%40rrefour17@10.49.64.5:8080'}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var json = JSON.parse(body);
        var data_length = json.length;
        console.log(data_length);
        for (var i = 0; i < data_length; i++) 
    {
         console.log(json[i]["title"] + " " + json[i]["price"]);
    }
    }
})*/
var HttpsProxyAgent = require('https-proxy-agent');
const url = 'https://213.32.115.155/trainees/getlogs/';
var fetch = require("node-fetch");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//require('ssl-root-cas').inject();
fetch(url, {agent: new HttpsProxyAgent('http://hazem_belkhiria:C%40rrefour17@10.49.64.5:8080')}).then((resp) => resp.json()).then(function(data){
    let authors = data.results;
    return console.log(data);
});