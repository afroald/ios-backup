import fs from 'fs';
import isStream from 'is-stream';
import tempy from 'tempy';
import readFile from './lib/fs/readFile';
import writeFile from './lib/fs/writeFile';
import writeStream from './util/writeStream';

export default class SelfDestructingTmpFile {
  constructor() {
    this.path = tempy.file();

    process.on('exit', () => {
      this.destroy();
    });
  }

  static async create(input) {
    const tmpFile = new SelfDestructingTmpFile();

    if (input) {
      await tmpFile.write(input);
    }

    return tmpFile;
  }

  async write(input) {
    const write = isStream(input) ? writeStream : writeFile;
    await write(this.path, input);
  }

  read() {
    return readFile(this.path);
  }

  destroy() {
    if (this.path === null) {
      return;
    }

    try {
      fs.unlinkSync(this.path);
    } catch (error) {}

    this.path = null;
  }
}
