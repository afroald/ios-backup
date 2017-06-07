/* eslint-env node, jest */

import createNamedFunction from '../createNamedFunction';

describe('createNamedFunction', () => {
  it('an anonymous function should not have a name', () => {
    expect((() => {}).name).toBe('');
  });

  it('return a function', () => {
    const namedFunction = createNamedFunction('namedFunction', () => {});
    expect(namedFunction).toBeInstanceOf(Function);
  });

  it('should set the returned functions name', () => {
    const namedFunction = createNamedFunction('namedFunction', () => {});
    expect(namedFunction.name).toBe('namedFunction');
  });
});
