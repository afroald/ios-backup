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

  getReadStream() {
    const decipher = crypto.createDecipheriv(cipherType, this.key, zeroIv);
    const readStream = fs.createReadStream(this.path);
    return readStream.pipe(decipher);
  }
}

export const FileProtectionClasses = {
  NSFileProtectionComplete: 1,
  NSFileProtectionCompleteUnlessOpen: 2,
  NSFileProtectionCompleteUntilFirstUserAuthentication: 3,
  NSFileProtectionNone: 4,
  'NSFileProtectionRecover?': 5,
  kSecAttrAccessibleWhenUnlocked: 6,
  kSecAttrAccessibleAfterFirstUnlock: 7,
  kSecAttrAccessibleAlways: 8,
  kSecAttrAccessibleWhenUnlockedThisDeviceOnly: 9,
  kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly: 10,
  kSecAttrAccessibleAlwaysThisDeviceOnly: 11,
};
