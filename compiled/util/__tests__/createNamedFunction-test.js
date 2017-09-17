'use strict';

var _createNamedFunction = require('../createNamedFunction');

var _createNamedFunction2 = _interopRequireDefault(_createNamedFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('createNamedFunction', () => {
  it('an anonymous function should not have a name', () => {
    expect((() => {}).name).toBe('');
  });

  it('return a function', () => {
    const namedFunction = (0, _createNamedFunction2.default)('namedFunction', () => {});
    expect(namedFunction).toBeInstanceOf(Function);
  });

  it('should set the returned functions name', () => {
    const namedFunction = (0, _createNamedFunction2.default)('namedFunction', () => {});
    expect(namedFunction.name).toBe('namedFunction');
  });
}); /* eslint-env node, jest */