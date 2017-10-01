'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FileCollection;
function FileCollection(fileArray) {
  const indexed = {};

  fileArray.forEach(file => {
    indexed[file.id] = file;
  });

  return new Proxy(fileArray, {
    get(target, property) {
      if (typeof property === 'string') {
        const index = parseInt(property, 10);

        if (isNaN(index) && property in indexed) {
          return indexed[property];
        }
      }

      return target[property];
    }
  });
}