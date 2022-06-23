'use strict';

const { load, extract } = require('@node-rs/jieba');

load();

const res = extract(
  '纽约市长吹杨，天气不错',
  4,
);

console.log(res);
