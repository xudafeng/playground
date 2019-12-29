'use strict';

const path = require('path');
const boardRootPath = require.resolve('debugger-board');
const proxyMiddleware = require('http-proxy-middleware');

const defaultOptions = {
  protocol: 'http',
  hub: 'default',
  changeOrigin: false,
  showBoard: false
};

module.exports = app => {
  return options => {
    Object.keys(options.proxy).forEach(router => {
      const config = options.proxy[router];
      const protocol = config.protocol || options.protocol || defaultOptions.protocol;
      const hostname = config.hostname || options.hostname || defaultOptions.hostname;
      const port = config.port || options.port || defaultOptions.port;
      const hub = config.hub || options.hub || defaultOptions.hub;
      const changeOrigin = config.changeOrigin || options.changeOrigin || defaultOptions.changeOrigin;
      const rewrite = config.rewrite || options.rewrite || '^/';

      const target = `${protocol}://${hostname}:${port}`;

      app.use(router, proxyMiddleware({
        target,
        changeOrigin,
        logLevel: 'error',
        pathRewrite: {
          [rewrite]: `/data/${hub}/`
        }
      }));
    });

    const showBoard = options.showBoard || defaultOptions.showBoard;

    if (showBoard) {
      const express = require('express');
      const staticDir = path.resolve(boardRootPath, '..', 'dist');
      app.use(express.static(staticDir));
      app.use((req, res, next) => {
        if (req.headers && req.headers.accept && !!~req.headers.accept.indexOf('text/html')) {
          var send = res.send;
          res.send = function(string) {
            var body = string instanceof Buffer ? string.toString() : string;
            body = body.replace(/<\/body>/, origin => {
              return `
                <script src="/debugger-board.js"></script>
                <script>
                  window._debugger_board_datahub_options = ${JSON.stringify(options)};
                  window._debugger_board.append(document.body);
                </script>
                ${origin}
              `;
            });
            send.call(this, body);
          };
        }
        next();
      });
    }
  };
};
