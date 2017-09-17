'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileProtectionClasses = undefined;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const zeroIv = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);

const cipherType = 'aes-256-cbc';

class FileProtection {
  constructor({ path, key, protectionClass, keyBag }) {
    this.path = path;
    this.key = keyBag.unwrapKeyForClass(key, protectionClass);
    this.protectionClass = protectionClass;
    this.keyBag = keyBag;
  }

  getReadStream() {
    const decipher = _crypto2.default.createDecipheriv(cipherType, this.key, zeroIv);
    const readStream = _fs2.default.createReadStream(this.path);
    return readStream.pipe(decipher);
  }
}

exports.default = FileProtection;
const FileProtectionClasses = exports.FileProtectionClasses = {
  NSFileProtectionComplete: 1,
  NSFileProtectionCompleteUnlessOpen: 2,
  NSFileProtectionCompleteUntilFirstUserAuthentication: 3,
  NSFileProtectionNone: 4,
  'NSFileProtectionRecover?': 5,
  kSecAttrAccessibleWhenUnlocked: 6,
  kSecAttrAccessibleAfterFirstUnlock: 7,
  kSecAttrAccessibleAlways: 8,
  kSecAttrAccessibleWhenUnlockedThisDeviceOnly: 9,
  kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly: 10,
  kSecAttrAccessibleAlwaysThisDeviceOnly: 11
};