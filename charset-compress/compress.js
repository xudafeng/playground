'use strict';

var fs = require('fs');
var path = require('path');

var buf = new Buffer(1024);
var data = fs.readFileSync('origin.jpg');
var length = 5 + data.length + Math.ceil(data.length / 7);
var body = new Buffer(length);
var offset = 0;

body.writeUInt8(data.length & 0x7f, offset++);
body.writeUInt8((data.length >> 8) & 0x7f, offset++);
body.writeUInt8((data.length >> 16) & 0x7f, offset++);
body.writeUInt8((data.length >> 24) & 0x7f, offset++);

var swap = 0;

swap |= (data.length >> 7) & 0x1;
swap |= (data.length >> 14) & 0x2;
swap |= (data.length >> 21) & 0x4;
swap |= (data.length >> 28) & 0x8;

body.writeUInt8(swap, offset);

var swap = 0;
var count = 0;

for (var i = 0; i < data.length; i++) {
  swap |= ((data[i] & 0x80) >> (i % 7 + 1));
  count++;
  if (i === data.length - 1 ||count % 7 === 0) {
    body.writeUInt8(swap, ++offset);
    swap = 0;
  }
}

for (var i = 0; i < data.length; i++) {
  body.writeUInt8(data[i] & 0x7f, ++offset);
}

var tempFile = 'temp.file';

fs.writeFileSync(tempFile, body);

var temp = fs.readFileSync(tempFile);
var len = 0;

len |= (temp.readUInt8(0) & 0x7f);
len |= ((temp.readUInt8(1) & 0x7f) << 8);
len |= ((temp.readUInt8(2) & 0x7f) << 16);
len |= ((temp.readUInt8(3) & 0x7f) << 24);
len |= ((temp.readUInt8(4) & 0x1) << 7);
len |= ((temp.readUInt8(4) & 0x2) << 14);
len |= ((temp.readUInt8(4) & 0x4) << 21);
len |= ((temp.readUInt8(4) & 0x8) << 28);

var buf = new Buffer(len);

for (var i = 0; i < buf.length; i++) {
  var swap = 0;
  swap |= ((temp.readUInt8(parseInt(i / 7) + 5) << (i % 7 + 1)) & 0x80);
  swap |= temp.readUInt8(i + temp.length - len);
  buf.writeUInt8(swap, i);
}

fs.writeFileSync('gen.jpg', buf);
fs.writeFileSync('index.html', `<img src="data:image/gif;base64,${buf.toString('base64')}"/>`, 'utf8');
