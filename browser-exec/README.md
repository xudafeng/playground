# browser-exec

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/browser-exec.svg?style=flat-square
[npm-url]: https://npmjs.org/package/browser-exec
[travis-image]: https://img.shields.io/travis/xudafeng/browser-exec.svg?style=flat-square
[travis-url]: https://travis-ci.org/xudafeng/browser-exec
[coveralls-image]: https://img.shields.io/coveralls/xudafeng/browser-exec.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/xudafeng/browser-exec?branch=master
[node-image]: https://img.shields.io/badge/node.js-%3E=_8-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/browser-exec.svg?style=flat-square
[download-url]: https://npmjs.org/package/browser-exec

> Execute the script in the browser in any posture you want

Used to help complete some batch processing and automation tasks, just like manual operations in a browser.

## Usage

1. Load the first view by point the --target-url
2. Write some scripts in a file, and point to --script

```bash
$ ./bin/browser-exec.js --target-url https://www.google.com --script ./sample.js
```

## License

The MIT License (MIT)
