'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _streamBuffers = require('stream-buffers');

var _readFile = require('../lib/fs/readFile');

var _readFile2 = _interopRequireDefault(_readFile);

var _SelfDestructingTmpFile = require('../SelfDestructingTmpFile');

var _SelfDestructingTmpFile2 = _interopRequireDefault(_SelfDestructingTmpFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env node, jest */

describe('SelfDestructingTmpFile', () => {
  it('has a factory', async () => {
    const tmpFile = await _SelfDestructingTmpFile2.default.create();
    expect(tmpFile).toBeInstanceOf(_SelfDestructingTmpFile2.default);
  });

  it('has a path', () => {
    const tmpFile = new _SelfDestructingTmpFile2.default();
    expect(tmpFile).toBeInstanceOf(_SelfDestructingTmpFile2.default);
    expect(tmpFile.path).toBeDefined();
  });

  it('will write a buffer', async () => {
    const tmpFile = new _SelfDestructingTmpFile2.default();
    const testData = Buffer.from([0x01, 0x02, 0x03]);

    await tmpFile.write(testData);

    const fileContents = await (0, _readFile2.default)(tmpFile.path);
    expect(Buffer.compare(testData, fileContents)).toBe(0);
  });

  it('will write a stream', async () => {
    const tmpFile = new _SelfDestructingTmpFile2.default();
    const testData = Buffer.from([0x01, 0x02, 0x03]);
    const readable = new _streamBuffers.ReadableStreamBuffer();

    readable.put(testData);
    readable.stop();

    await tmpFile.write(readable);

    const fileContents = await (0, _readFile2.default)(tmpFile.path);
    expect(Buffer.compare(testData, fileContents)).toBe(0);
  });

  it('will destruct', async () => {
    const tmpFile = new _SelfDestructingTmpFile2.default();
    const path = tmpFile.path;
    await tmpFile.write('test');

    expect(() => {
      _fs2.default.statSync(path);
    }).not.toThrowError();

    tmpFile.destroy();

    expect(() => {
      _fs2.default.statSync(path);
    }).toThrowError(/ENOENT/);
  });
});