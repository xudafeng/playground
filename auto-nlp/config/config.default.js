'use strict';

const path = require('path');
const dotenv = require('dotenv');

const { DEBUG_MODE } = process.env;

if (DEBUG_MODE) {
  dotenv.config();
} else {
  dotenv.config({
    path: path.resolve(__dirname, '..', '.env.prod'),
  });
}

console.log(process.env);

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532324805616_3743';

  // add your config here
  config.middleware = [];

  return config;
};
