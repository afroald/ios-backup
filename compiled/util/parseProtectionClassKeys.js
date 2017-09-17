'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseProtectionClassKeys;

var _chunk = require('./chunk');

var _chunk2 = _interopRequireDefault(_chunk);

var _ProtectionClassKey = require('../ProtectionClassKey');

var _ProtectionClassKey2 = _interopRequireDefault(_ProtectionClassKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseProtectionClassKeys(entries) {
  const chunks = (0, _chunk2.default)(entries, 5);
  const keys = chunks.map(data => {
    const key = {};

    data.forEach(({ tag, value }) => {
      key[tag] = value;
    });

    return new _ProtectionClassKey2.default({
      uuid: key.UUID,
      protectionClass: key.CLAS,
      wrap: key.WRAP,
      ktyp: key.KTYP,
      wrappedKey: key.WPKY
    });
  });

  return keys;
}