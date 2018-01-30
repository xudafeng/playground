'use strict';

const fs = require('fs');
const debuggerBoard = require('debugger-board');
const proxyMiddleware = require('http-proxy-middleware');

const script = fs.readFileSync(debuggerBoard.staticDir, 'utf8');

const defaultOptions = {
  protocol: 'http',
  hub: 'default',
  changeOrigin: false,
  showBoard: false
};

module.exports = app => {
  const boardList = [];

  return options => {
    Object.keys(options.proxy).forEach(router => {
      const config = options.proxy[router];
      const protocol = config.protocol || options.protocol || defaultOptions.protocol;
      const hostname = config.hostname || options.hostname || defaultOptions.hostname;
      const port = config.port || options.port || defaultOptions.port;
      const hub = config.hub || options.hub || defaultOptions.hub;
      const changeOrigin = config.changeOrigin || options.changeOrigin || defaultOptions.changeOrigin;

      const target = `${protocol}://${hostname}:${port}`;

      app.use(router, proxyMiddleware({
        target,
        changeOrigin,
        logLevel: 'error',
        pathRewrite: {
          [router]: `/data/${hub}`
        }
      }));
      boardList.push({
        router,
        hub,
        port,
        hostname,
        protocol
      });
    });

    const showBoard = options.showBoard || defaultOptions.showBoard;

    if (showBoard) {
      app.use((req, res, next) => {
        if (req.headers && req.headers.accept && !!~req.headers.accept.indexOf('text/html')) {
          var send = res.send;
          res.send = function(string) {
            var body = string instanceof Buffer ? string.toString() : string;
            body = body.replace(/<\/body>/, origin => {
              return `
                <script>
                  (function() {
                    window._debugger_board_datahub = ${JSON.stringify(boardList)};
                    ${script}
                    window._debugger_board.append(document.body);
                  })();
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
