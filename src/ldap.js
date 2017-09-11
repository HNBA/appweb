//var ldap = require('ldapjs');
//var client = ldap.createClient({
 //url: 'ldap://bastion:389'
//});

var express      = require('express'),
    passport     = require('passport'),
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');
 
var OPTS = {
  server: {
    url: 'ldap://bastion:389',
    bindDN: 'cn=admin,cn=Users,dc=trainees,dc=ddns,dc=net',
    bindCredentials: 'trainees',
    searchBase: 'cn=Users,dc=trainees,dc=ddns,dc=net',
    searchFilter: '(cn={{username}})'
  }
};
 
var app = express();
 
passport.use(new LdapStrategy(OPTS));
 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
 
app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  res.send({status: 'ok'});
});

app.get('/', function (req, res) {
   res.write('hello'); res.end();
});
 
app.listen(80);

