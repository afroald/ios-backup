'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _isStream = require('is-stream');

var _isStream2 = _interopRequireDefault(_isStream);

var _tempy = require('tempy');

var _tempy2 = _interopRequireDefault(_tempy);

var _readFile = require('./lib/fs/readFile');

var _readFile2 = _interopRequireDefault(_readFile);

var _writeFile = require('./lib/fs/writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _writeStream = require('./util/writeStream');

var _writeStream2 = _interopRequireDefault(_writeStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SelfDestructingTmpFile {
  constructor() {
    this.path = _tempy2.default.file();

    process.on('exit', () => {
      this.destroy();
    });
  }

  static async create(input) {
    const tmpFile = new SelfDestructingTmpFile();

    if (input) {
      await tmpFile.write(input);
    }

    return tmpFile;
  }

  async write(input) {
    const write = (0, _isStream2.default)(input) ? _writeStream2.default : _writeFile2.default;
    await write(this.path, input);
  }

  read() {
    return (0, _readFile2.default)(this.path);
  }

  destroy() {
    if (this.path === null) {
      return;
    }

    try {
      _fs2.default.unlinkSync(this.path);
    } catch (error) {}

    this.path = null;
  }
}
exports.default = SelfDestructingTmpFile;