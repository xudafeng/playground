'use strict';

var socket = null;

var connect = function(data) {
  var remote = data.remote;
  socket = new WebSocket(remote);

  self.postMessage({
    action: 'status',
    data: `status: ${socket.readyState}`
  });

  socket.onerror = function(e) {
    self.postMessage({
      action: 'status',
      data: `error: ${e.stack}`
    });
  };

  socket.onopen = function() {
    self.postMessage({
      action: 'status',
      data: `onopen: ${socket.readyState}`
    });
  };

  socket.onclose = function() {
    self.postMessage({
      action: 'status',
      data: `onclose: ${socket.readyState}`
    });
  };

  socket.onmessage = function(message) {
    self.postMessage({
      action: 'message',
      data: message.data
    });
  };
};

self.addEventListener('message', function(message) {
  var data = message.data;

  if (data.action === 'connect') {
    connect(data.data);
  } else {
    socket.send(data.data);
  }
}, false);
