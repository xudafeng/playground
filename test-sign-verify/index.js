'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const urllib = require('urllib');

const publicKey = fs.readFileSync(path.join(__dirname, 'rsa_public_key.pem'));
const privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private_key.pem'));

const url = '';
const verify = crypto.createVerify('SHA256');
const signature = '';
(async () => {
  const res = await urllib.request(url, {
    streaming: true,
    followRedirect: true,
    timeout: 10 * 60 * 1000,
  });
  res.res.on('data', data => {
    verify.update(data);
  });
  res.res.on('end', () => {
    verify.end();
    const res = verify.verify(publicKey, signature, 'hex');
    console.log(res);
  });
})();

// const sign = crypto.createSign('SHA256');
// const file = './latest.asar.zip';
// const s = fs.createReadStream(file);
// s.on('data', function(d) {
//   // console.log(d);
//   sign.update(d);
// });
// s.on('end', function() {
//   sign.end();
//   const signature = sign.sign(privateKey, 'hex');
//   console.log(signature);
// });
