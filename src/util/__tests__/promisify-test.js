/* eslint-env node, jest */

import promisify from '../promisify';

function test(returnError, callback) {
  process.nextTick(() => {
    if (returnError) {
      return callback('error');
    }

    return callback(null, 'result');
  });
}

describe('promisify', () => {
  it('returns a function with the same name', () => {
    const promiseTest = promisify(test);
    expect(promiseTest).toBeInstanceOf(Function);
    expect(promiseTest.name).toBe('test');
  });

  it('returns a function that returns a promise', () => {
    const promiseTest = promisify(test);
    const promise = promiseTest(false);
    expect(promise).toBeInstanceOf(Promise);
  });

  it('the returned promise resolves when callback is called', async () => {
    expect.assertions(1);

    const promiseTest = promisify(test);
    await expect(promiseTest(false)).resolves.toBe('result');
  });

  it('the returned promise rejects when the callback receives an error', async () => {
    expect.assertions(1);

    const promiseTest = promisify(test);
    await expect(promiseTest(true)).rejects.toEqual('error');
  });
});
