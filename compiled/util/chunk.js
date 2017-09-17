"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function chunk(array, size) {
  const results = [];

  while (array.length) {
    results.push(array.splice(0, size));
  }

  return results;
}

exports.default = chunk;