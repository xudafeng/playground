// 服务器配置模块

'use strict';

var path = require('path');
var koa = require('koa');
var logger = require('koa-logger');
var router = require('koa-router');
var nunjucks = require('nunjucks');
var request = require('co-request');
var ipv4 = require('ipv4');

var viewPath = path.join(__dirname, 'view'); // 获取当前模板文件的目录

// 百度美女墙的地址
var URL = 'http://image.baidu.com/channel?c=%E7%BE%8E%E5%A5%B3#%E7%BE%8E%E5%A5%B3';

var PORT = 8080; // 服务要监听的端口

// 模板引擎配置 请忽略
nunjucks.configure(viewPath, {
  autoescape: true
});


// 导出模块
exports.start = function() {
  // 初始化 koa
  var app = koa();

  app.use(router(app));
  app.use(logger());

  // 添加路由
  app.get('/', function *(next) {
    // 请求百度美女墙页面
    var result = yield request(URL);

    // 定义一个数组
    var list = [];

    var body = result.body;

    body.match(/"imageUrl"\s*:\s*"([^"]+)"/g).forEach(function(c) {
      var url = c.replace(/"imageUrl"\s*:\s*"(\S+)"/, '$1');

      list.push({
        title: ' 这是 ' + list.length + ' 位mm',
        url: url
      });
    });

    // 响应数据
    this.body = nunjucks.render('./wall.html', {
      list: list
    });
  });

  // 监听端口
  app.listen(PORT);

  console.log(' starting at ' + ipv4 + ':' + PORT + ' ...');
};
