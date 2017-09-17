'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _plist = require('./util/plist');

var _plist2 = _interopRequireDefault(_plist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class File {
  constructor({ id, domain, path, plistBlob }) {
    this.id = id;
    this.domain = domain;
    this.path = path;
    this.plistBlob = plistBlob;
  }
}
exports.default = File;