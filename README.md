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
  proxy: {
    '^/api': {
    hub: 'project_name',
    port: 8080,
    hostname: 'localhost'
  }
};

datahubMiddleware(app)(datahubConfig);
```

## Use with webpack-dev-server

[live demo](//github.com/macaca-sample/webpack-datahub-sample)

```javascript
const path = require('path');
const DataHub = require('macaca-datahub');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const datahubMiddleware = require('datahub-proxy-middleware');

// datahub config
// document: https://github.com/macacajs/macaca-datahub#configuration

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, '..', 'data'),
  proxy: {
    '^/api': {
      hub: 'sample',
    },
  },
  showBoard: true,
};

const defaultDatahub = new DataHub({
  port: datahubConfig.port,
});

// webpack config

// plugins field
plugins: [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.html')
  }),
],

// devServer field
devServer: {
  before: app => {
    datahubMiddleware(app)(datahubConfig);
  },
  after: () => {
    defaultDatahub.startServer(datahubConfig).then(() => {
      console.log('datahub ready');
    });
  },
},
```

showBoard will inject [debugger-board](//github.com/macacajs/debugger-board)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars1.githubusercontent.com/u/17233599?v=4" width="100px;"/><br/><sub><b>Chan-Chun</b></sub>](https://github.com/Chan-Chun)<br/>
| :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor.git), auto upated at `Sun Mar 25 2018 16:00:50 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## License

The MIT License (MIT)
