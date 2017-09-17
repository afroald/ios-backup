'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Backup;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _plist = require('./util/plist');

var _plist2 = _interopRequireDefault(_plist);

var _KeyBag = require('./KeyBag');

var _KeyBag2 = _interopRequireDefault(_KeyBag);

var _Manifest = require('./Manifest');

var _Manifest2 = _interopRequireDefault(_Manifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * How should the API be?
 * const backup = new Backup(path);
 * backup.isEncrypted() => Promise
 * backup.unlock(password)
 * backup.files() => Promise (returns array of files)
 * backup.extract(dest) => Promise
 * backup.extractFile(file, dest) => Promise
 */
function Backup(backupPath, manifestMetadata) {
  const keyBag = new _KeyBag2.default(manifestMetadata.BackupKeyBag);
  let backupManifest;

  Object.defineProperty(this, 'isEncrypted', {
    value: manifestMetadata.IsEncrypted
  });

  async function getManifest() {
    if (!backupManifest) {
      backupManifest = await _Manifest2.default.fromEncryptedFile(_path2.default.resolve(backupPath, 'Manifest.db'), keyBag, manifestMetadata.ManifestKey);
    }

    return backupManifest;
  }

  this.unlock = function unlock(password) {
    return keyBag.unlock(password);
  };

  this.files = async function files() {
    const manifest = await getManifest();
    return manifest.files;
  };
}

Backup.create = async function create(backupPath) {
  const manifestMetadata = await _plist2.default.load(_path2.default.resolve(backupPath, 'Manifest.plist'));
  return new Backup(backupPath, manifestMetadata);
};