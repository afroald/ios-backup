/* eslint-env node, jest */

import FileCollection from '../FileCollection';

const testFiles = [
  { id: 'file1' },
  { id: 'file2' },
  { id: 'file3' },
  { id: 'file4' },
  { id: 'file5' },
  { id: 'file6' },
];

describe('FileCollection', () => {
  let files = null;

  beforeEach(() => {
    files = new FileCollection(testFiles);
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
