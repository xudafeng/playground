'use strict';

var worker = new Worker('background.js');

var $ = window.$ = document.querySelector.bind(document);
var $$ = window.$$ = document.querySelectorAll.bind(document);

var getUrlParams = function(k) {
  var params = {};
  var url = location.href;
  var idx = url.indexOf('?');

  if (idx > 0) {
    var queryStr = url.substring(idx + 1);
    var args = queryStr.split('&');

    for (let i = 0; i < args.length; i++) {
      var a = args[i];
      var nv = args[i] = a.split('=');
      params[nv[0]] = nv.length > 1 ? nv[1] : true;
    }
  }
  return params[k];
};

var bindEvent = function(el, eventName, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventName, handler, false);
  } else {
    el.attachEvent('on' + eventName, function(){
      handler.call(el);
    });
  }
};

var getRemote = function() {
  var host = location.host.split(':')[0];
  var server = getUrlParams('server') || `ws://${host}:5678/`;

  if (!~server.indexOf('ws://')) {
    server = `ws://${server}`;
  }

  changeStatus(`get remote: ${server}`);
  return server;
};

var changeStatus = function(log) {
  $('#status').innerHTML = log;
};

worker.postMessage({
  action: 'connect',
  data: {
    remote: getRemote()
  }
});

var myuuid = null;

window.sendMessage = function(uuid, content) {
  myuuid = uuid;
  var data = {
    name: uuid || 'user_1',
    message: content || 'test content' ,
    date: new Date()
  };

  var jsonstring = JSON.stringify(data);

  worker.postMessage({
    action: 'message',
    data: jsonstring
  });

};

var getStyleValue = function(elem, key) {
  return parseInt(getComputedStyle(elem)[key], 10)
};

var changeView = function() {
  var historyElem = $('#history');
  var containerHeight = getStyleValue(historyElem, 'height');

  var items = $$('#history li');
  var totalHeight = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    totalHeight += getStyleValue(item, 'height');
    totalHeight += getStyleValue(item, 'paddingTop');
    totalHeight += getStyleValue(item, 'paddingBottom');
  }

  var offsetHeight = totalHeight - containerHeight;
  var contentElem = $('#history .content');

  if (offsetHeight > 0) {
    contentElem.style.top = `${-60 - offsetHeight}px`;
  }
};

var avatar_1 = $('#avatar_1').innerHTML.trim();
var avatar_2 = $('#avatar_2').innerHTML.trim();


bindEvent(worker, 'message', function(message) {
  changeStatus('message arrived');

  var data = message.data;

  if (data.action === 'message') {
    data = JSON.parse(data.data);
    var myself = myuuid === data.name;
    var item = `<li class="${myself ? 'myself' : ''}"><img src="${myself ? avatar_1 : avatar_2}" /><span>${data.message}</span></li>`;
    $('#history .content').innerHTML += item;
    changeView();
  } else if (data.action === 'status') {
    changeStatus(data.data)
  }
});
