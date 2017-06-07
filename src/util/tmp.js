import fs from 'fs';
import tempWrite from 'temp-write';

class TmpFileManager {
  constructor() {
    this.files = [];

    process.on('exit', () => this.cleanup());
  }

  async write(content) {
    const path = await tempWrite(content);
    this.files.push(path);
    return path;
  }

  cleanup() {
    this.files.forEach(file => fs.unlinkSync(file));
    this.files = [];
  }
}

const sharedInstance = new TmpFileManager();

export default sharedInstance;
