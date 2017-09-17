"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aesKw = require("aes-kw");

var _aesKw2 = _interopRequireDefault(_aesKw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProtectionClassKey {
  constructor({ uuid, protectionClass, wrap, ktyp, wrappedKey }) {
    this.uuid = uuid;
    this.protectionClass = protectionClass;
    this.wrap = wrap;
    this.ktyp = ktyp;
    this.wrappedKey = wrappedKey;
    this.key = null;
  }

  unwrap(key) {
    this.key = _aesKw2.default.decrypt(key, this.wrappedKey);
  }

  isUnwrapped() {
    return this.key !== null;
  }

  toBuffer() {
    if (!this.key) {
      throw new Error("Can't return protection class key because it's not unwrapped yet.");
    }

    return this.key;
  }
}
exports.default = ProtectionClassKey;