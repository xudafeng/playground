const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});

console.log(privateKey, publicKey);

const publicKey = fs.readFileSync(path.join(__dirname, 'rsa_public_key.pem'));
const privateKey = fs.readFileSync(path.join(__dirname, 'rsa_private_key.pem'));

const sign = crypto.createSign('SHA256');
sign.update('some data to sign');
sign.end();
const signature = sign.sign(privateKey, 'hex');
console.log(signature);

const verify = crypto.createVerify('SHA256');
verify.update('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));