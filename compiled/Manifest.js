'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Manifest;

var _betterSqlite = require('better-sqlite3');

var _betterSqlite2 = _interopRequireDefault(_betterSqlite);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _FileProtection = require('./FileProtection');

var _FileProtection2 = _interopRequireDefault(_FileProtection);

var _SelfDestructingTmpFile = require('./SelfDestructingTmpFile');

var _SelfDestructingTmpFile2 = _interopRequireDefault(_SelfDestructingTmpFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Manifest(databasePath) {
  const db = new _betterSqlite2.default(databasePath);

  process.on('exit', () => {
    db.close();
  });

  Object.defineProperty(this, 'files', {
    get() {
      const files = db.prepare('SELECT * from `Files`').all();

      return files.map(file => new _File2.default({
        id: file.fileID,
        domain: file.domain,
        path: file.relativePath,
        flags: file.flags,
        file: file.file
      }));
    }
  });
}

Manifest.create = async function create(databasePath) {
  return new Manifest(databasePath);
};

Manifest.fromEncryptedFile = async function fromEncryptedFile(databasePath, keyBag, key) {
  const protection = new _FileProtection2.default({
    path: databasePath,
    key: key.slice(4),
    protectionClass: _FileProtection.FileProtectionClasses.NSFileProtectionNone,
    keyBag
  });

  const decryptedDatabaseFile = await _SelfDestructingTmpFile2.default.create(protection.getReadStream());

  return Manifest.create(decryptedDatabaseFile.path);
};