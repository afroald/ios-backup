'use strict';

var _FileCollection = require('../FileCollection');

var _FileCollection2 = _interopRequireDefault(_FileCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const testFiles = [{ id: 'file1' }, { id: 'file2' }, { id: 'file3' }, { id: 'file4' }, { id: 'file5' }, { id: 'file6' }]; /* eslint-env node, jest */

describe('FileCollection', () => {
  let files = null;

  beforeEach(() => {
    files = new _FileCollection2.default(testFiles);
  });

  it('is an array', () => {
    expect(files).toBeInstanceOf(Array);
  });

  it('gives access to files via index', () => {
    expect(files[0]).toBe(testFiles[0]);
    expect(files[2]).toBe(testFiles[2]);
  });

  it('gives access to files via id', () => {
    expect(files.file1).toBe(testFiles[0]);
    expect(files.file3).toBe(testFiles[2]);
  });
});