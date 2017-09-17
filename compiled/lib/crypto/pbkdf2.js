'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _promisify = require('../../util/promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pbkdf2 = (0, _promisify2.default)(_crypto2.default.pbkdf2);
exports.default = pbkdf2;