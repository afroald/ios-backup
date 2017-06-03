import aesKeyWrap from 'aes-kw';

export default class ProtectionClassKey {
  constructor({ uuid, protectionClass, wrap, ktyp, wrappedKey }) {
    this.uuid = uuid;
    this.protectionClass = protectionClass;
    this.wrap = wrap;
    this.ktyp = ktyp;
    this.wrappedKey = wrappedKey;
    this.key = null;
  }

  unwrap(key) {
    this.key = aesKeyWrap.decrypt(key, this.wrappedKey);
  }

  isUnwrapped() {
    return this.key !== null;
  }

  toBuffer() {
    if (!this.key) {
      throw new Error("Can't return protection class key because it's not unwrapped yet.");
    }

    return this.key;
  }
}
