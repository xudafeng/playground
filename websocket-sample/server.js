'use strict';

const ipv4 = require('ipv4');
const ws = require('websocket.io');

const port = 5678;

const server = ws.listen(port, function() {
  console.log(`ws start at: ws://${ipv4}:${port}/`);
});

server.on('connection', socket => {
  socket.on('message', data => {
    console.log(`message: ${data}`);
    server.clients.forEach(client => {
      client.send(data);
    });
  });
});
