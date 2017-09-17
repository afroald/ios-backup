'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promisify;

var _createNamedFunction = require('./createNamedFunction');

var _createNamedFunction2 = _interopRequireDefault(_createNamedFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function promisify(func) {
  return (0, _createNamedFunction2.default)(func.name, (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  });
}