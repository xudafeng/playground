'use strict';

process.env.ENCRYPTION_KEY = '01234567890123456789012345678901';

const { encrypt, decrypt } = require('./encryption');

const input1 = 'test';
const output1 = encrypt(input1);
console.log('input1: %s, output1: %s', input1, output1);

const input2 = '456a854c200228769c305100a0342ab6:3b3bd99dc3ff649735006e54686dcaeb';
const output2 = decrypt(input2);
console.log('input2: %s, output2: %s', input2, output2);
