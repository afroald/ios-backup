'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _promisify = require('../../util/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const stat = (0, _promisify2.default)(_fs2.default.stat);
exports.default = stat;