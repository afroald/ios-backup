import crypto from 'crypto';
import fs from 'fs';

const zeroIv = Buffer.from([
  0x00,
  0x00,
  0x00,
  0x00,

  0x00,
  0x00,
  0x00,
  0x00,

  0x00,
  0x00,
  0x00,
  0x00,

  0x00,
  0x00,
  0x00,
  0x00,
]);

const cipherType = 'aes-256-cbc';

export default class FileProtection {
  constructor({ path, key, protectionClass, keyBag }) {
    this.path = path;
    this.key = keyBag.unwrapKeyForClass(key, protectionClass);
    this.protectionClass = protectionClass;
    this.keyBag = keyBag;
  }

  getStream() {
    const decipher = crypto.createDecipheriv(cipherType, this.key, zeroIv);
    const readStream = fs.createReadStream(this.path);
    return readStream.pipe(decipher);
  }
}
