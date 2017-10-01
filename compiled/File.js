'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = File;

var _plist = require('./util/plist');

var _plist2 = _interopRequireDefault(_plist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function File({ id, domain, path, flags, file }) {
  this.id = id;
  this.domain = domain;
  this.path = path;
  this.flags = flags;

  let parsedFile = null;

  Object.defineProperty(this, 'file', {
    get() {
      if (!parsedFile) {
        parsedFile = _plist2.default.parse(file);
      }

      return parsedFile;
    }
  });
}