'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simplePlist = require('simple-plist');

var _simplePlist2 = _interopRequireDefault(_simplePlist);

var _promisify = require('./promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const plistUtil = {
  load: (0, _promisify2.default)(_simplePlist2.default.readFile),
  parse: _simplePlist2.default.parse
};

exports.default = plistUtil;