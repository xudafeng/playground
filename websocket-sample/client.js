'use strict';

var worker = new Worker('background.js');

var $ = document.querySelector.bind(document);

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
  var server = getUrlParams('server') || 'ws://localhost:5678/';

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

bindEvent($('#send'), 'click', function(e) {
  var data = {
    name: $('#name').value,
    message: $('#message').value,
    date: new Date()
  };

  var jsonstring = JSON.stringify(data);

  worker.postMessage({
    action: 'message',
    data: jsonstring
  });

  $('#message').value = '';
});

bindEvent(worker, 'message', function(message) {
  changeStatus('message arrived');

  var data = message.data;

  if (data.action === 'message') {
    data = JSON.parse(data.data);
    var color = $('#name').value === data.name ? 'red' : 'blue';
    var item = `<li><i style="color: ${color}">${data.name}</i>[${data.date}]<br>${data.message}</li>`;
    $('#history').innerHTML += item;
  } else if (data.action === 'status') {
    changeStatus(data.data)
  }
});
