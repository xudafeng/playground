# datahub-proxy-middleware

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/datahub-proxy-middleware.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datahub-proxy-middleware
[travis-image]: https://img.shields.io/travis/macacajs/datahub-proxy-middleware.svg?style=flat-square
[travis-url]: https://travis-ci.org/macacajs/datahub-proxy-middleware
[coveralls-image]: https://img.shields.io/coveralls/macacajs/datahub-proxy-middleware.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/macacajs/datahub-proxy-middleware?branch=master
[download-image]: https://img.shields.io/npm/dm/datahub-proxy-middleware.svg?style=flat-square
[download-url]: https://npmjs.org/package/datahub-proxy-middleware

---

> datahub proxy middleware

## Installment

```bash
$ npm i datahub-proxy-middleware --save-dev
```

## Common Usage

```javascript
const datahubMiddleware = require('datahub-proxy-middleware');
const datahubConfig = {
  mock: true,
  proxy: {
    '^/api': {
    hub: 'project_name',
    port: 8080,
    hostname: 'localhost'
  }
};
datahubMiddleware(app)(datahubConfig);
```

## License

The MIT License (MIT)
