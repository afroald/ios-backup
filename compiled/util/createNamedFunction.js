'use strict';

function createNamedFunction(name, func) {
  Object.defineProperty(func, 'name', { value: name });
  return func;
}

module.exports = createNamedFunction;