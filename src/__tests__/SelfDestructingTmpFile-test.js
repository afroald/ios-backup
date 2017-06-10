/* eslint-env node, jest */

import fs from 'fs';
import { ReadableStreamBuffer } from 'stream-buffers';
import readFile from '../lib/fs/readFile';
import SelfDestructingTmpFile from '../SelfDestructingTmpFile';

describe('SelfDestructingTmpFile', () => {
  it('has a factory', async () => {
    const tmpFile = await SelfDestructingTmpFile.create();
    expect(tmpFile).toBeInstanceOf(SelfDestructingTmpFile);
  });

  it('has a path', () => {
    const tmpFile = new SelfDestructingTmpFile();
    expect(tmpFile).toBeInstanceOf(SelfDestructingTmpFile);
    expect(tmpFile.path).toBeDefined();
  });

  it('will write a buffer', async () => {
    const tmpFile = new SelfDestructingTmpFile();
    const testData = Buffer.from([0x01, 0x02, 0x03]);

    await tmpFile.write(testData);

    const fileContents = await readFile(tmpFile.path);
    expect(Buffer.compare(testData, fileContents)).toBe(0);
  });

  it('will write a stream', async () => {
    const tmpFile = new SelfDestructingTmpFile();
    const testData = Buffer.from([0x01, 0x02, 0x03]);
    const readable = new ReadableStreamBuffer();

    readable.put(testData);
    readable.stop();

    await tmpFile.write(readable);

    const fileContents = await readFile(tmpFile.path);
    expect(Buffer.compare(testData, fileContents)).toBe(0);
  });

  it('will destruct', async () => {
    const tmpFile = new SelfDestructingTmpFile();
    const path = tmpFile.path;
    await tmpFile.write('test');

    expect(() => {
      fs.statSync(path);
    }).not.toThrowError();

    tmpFile.destroy();

    expect(() => {
      fs.statSync(path);
    }).toThrowError(/ENOENT/);
  });
});
