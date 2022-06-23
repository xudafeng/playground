'use strict';

var Barcode = require('../lib/barcode').Barcode;
var http = require('http');

var port = 6789;

console.log('Open url: http://localhost:' + port);

http.createServer(function(req, res) {
  var data = Barcode('hello alibaba!');
  var base64Data = data.replace(/^data:image\/\w+;base64,/, '');
  var dataBuffer = new Buffer(base64Data, 'base64');
  res.end(dataBuffer);
}).listen(port, 'localhost');
