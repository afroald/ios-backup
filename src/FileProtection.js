import crypto from 'crypto';

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
  constructor(path, key, protectionClass, keyBag) {
    this.path = path;

    const unwrappedKey = keyBag.unwrapKeyForClass(key, protectionClass);

    this.decipher = crypto.createDecipheriv(cipherType, unwrappedKey, zeroIv);
  }
}
