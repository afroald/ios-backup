'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/sindresorhus/temp-write/blob/master/index.js#L12
const writeStream = (filepath, input) => new Promise((resolve, reject) => {
  const writable = _fs2.default.createWriteStream(filepath);

  input.on('error', err => {
    // Be careful to reject before writable.end(), otherwise the writable's
    // 'finish' event will fire first and we will resolve the promise
    // before we reject it.
    reject(err);
    input.unpipe(writable);
    writable.end();
  }).pipe(writable).on('error', reject).on('finish', resolve);
});

exports.default = writeStream;