'use strict';

const proxyMiddleware = require('http-proxy-middleware');

const defaultOptions = {
  protocol: 'http',
  hub: 'default',
  changeOrigin: true
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

      const target = `${protocol}://${hostname}:${port}`;

      app.use(router, proxyMiddleware({
        target,
        changeOrigin,
        pathRewrite: {
          [router]: `/data/${hub}`
        }
      }));
    });
  };
};
