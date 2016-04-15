'use strict';

//modules
var LEX 	= require('letsencrypt-express').testing();
var express 	= require('express');
var app 	= express();

// port
var port = process.env.PORT || 80;

// set static file location
app.use(express.static('./public'));

var indexRoute = require('./routes/routes');  // configure routes
app.use('*', indexRoute);

// startup up
//app.listen(port);
var lex = LEX.create({
  configDir: './letsencrypt/etc', 
  approveRegistration: function(hostname, cb) {
    cb(null, {
      domains: [hostname],
      email: 'trav.tarr@gmail.com',
      agreeTos: true
    });
  }
});

lex.onRequest = app;

lex.listen([8080], [8443, 5001], function() {
  var protocol = ('requestCert' in this) ? 'https': 'http';
  console.log("Listening at " + protocol + '://localhost:' + this.address().port);
});



// expose app
exports = module.exports = app;
