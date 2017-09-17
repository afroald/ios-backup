'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aesKw = require('aes-kw');

var _aesKw2 = _interopRequireDefault(_aesKw);

var _pbkdf = require('./lib/crypto/pbkdf2');

var _pbkdf2 = _interopRequireDefault(_pbkdf);

var _parseKeyBagBlob = require('./util/parseKeyBagBlob');

var _parseKeyBagBlob2 = _interopRequireDefault(_parseKeyBagBlob);

var _parseProtectionClassKeys = require('./util/parseProtectionClassKeys');

var _parseProtectionClassKeys2 = _interopRequireDefault(_parseProtectionClassKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function calculateKeyBagKey(keyBagPassword, {
  key1: {
    salt: key1Salt,
    iterations: key1Iterations
  },
  key2: {
    salt: key2Salt,
    iterations: key2Iterations
  }
}) {
  const key1 = await (0, _pbkdf2.default)(keyBagPassword, key1Salt, key1Iterations, 32, 'sha256');
  const key2 = await (0, _pbkdf2.default)(key1, key2Salt, key2Iterations, 32, 'sha1');

  return key2;
}

class KeyBag {
  constructor(keyBagBlob) {
    const entries = (0, _parseKeyBagBlob2.default)(keyBagBlob);

    // Split the keybag metadata and class keys
    let firstUuidFound = false;
    const firstKeyIndex = entries.findIndex(data => {
      if (data.tag !== 'UUID') {
        return false;
      }

      if (!firstUuidFound) {
        firstUuidFound = true;
        return false;
      }

      return true;
    });

    const protectionClassKeys = entries.splice(firstKeyIndex);

    // Set keybag attributes
    this.attributes = {};
    entries.forEach(data => {
      this.attributes[data.tag] = data.value;
    });

    // Convert tag/value pairs into Key objects
    this.protectionClassKeys = (0, _parseProtectionClassKeys2.default)(protectionClassKeys);
  }

  async unlock(password) {
    const key = await calculateKeyBagKey(password, {
      key1: {
        salt: this.attributes.DPSL,
        iterations: this.attributes.DPIC
      },
      key2: {
        salt: this.attributes.SALT,
        iterations: this.attributes.ITER
      }
    });

    this.protectionClassKeys.forEach(protectionClassKey => protectionClassKey.unwrap(key));
  }

  getClassKey(protectionClass) {
    const protectionClassKey = this.protectionClassKeys.find(key => key.protectionClass === protectionClass);

    if (!protectionClassKey) {
      throw new Error(`No key found for protection class ${protectionClass}`);
    }

    return protectionClassKey;
  }

  unwrapKeyForClass(key, protectionClass) {
    const protectionClassKey = this.getClassKey(protectionClass);
    return _aesKw2.default.decrypt(protectionClassKey.toBuffer(), key);
  }
}
exports.default = KeyBag;