'use strict';

var _promisify = require('../promisify');

var _promisify2 = _interopRequireDefault(_promisify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function test(returnError, callback) {
  process.nextTick(() => {
    if (returnError) {
      return callback('error');
    }

    return callback(null, 'result');
  });
} /* eslint-env node, jest */

describe('promisify', () => {
  it('returns a function with the same name', () => {
    const promiseTest = (0, _promisify2.default)(test);
    expect(promiseTest).toBeInstanceOf(Function);
    expect(promiseTest.name).toBe('test');
  });

  it('returns a function that returns a promise', () => {
    const promiseTest = (0, _promisify2.default)(test);
    const promise = promiseTest(false);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('the returned promise resolves when callback is called', async () => {
    expect.assertions(1);

    const promiseTest = (0, _promisify2.default)(test);
    await expect(promiseTest(false)).resolves.toBe('result');
  });

  it('the returned promise rejects when the callback receives an error', async () => {
    expect.assertions(1);

    const promiseTest = (0, _promisify2.default)(test);
    await expect(promiseTest(true)).rejects.toEqual('error');
  });
});