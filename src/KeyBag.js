import aesKeyWrap from 'aes-kw';
import pbkdf2 from './lib/crypto/pbkdf2';
import parseKeyBagBlob from './util/parseKeyBagBlob';
import parseProtectionClassKeys from './util/parseProtectionClassKeys';

async function calculateKeyBagKey(keyBagPassword, {
  key1: {
    salt: key1Salt,
    iterations: key1Iterations,
  },
  key2: {
    salt: key2Salt,
    iterations: key2Iterations,
  },
}) {
  const key1 = await pbkdf2(keyBagPassword, key1Salt, key1Iterations, 32, 'sha256');
  const key2 = await pbkdf2(key1, key2Salt, key2Iterations, 32, 'sha1');

  return key2;
}

export default class KeyBag {
  constructor(keyBagBlob) {
    const entries = parseKeyBagBlob(keyBagBlob);

    // Split the keybag metadata and class keys
    let firstUuidFound = false;
    const firstKeyIndex = entries.findIndex((data) => {
      if (data.tag !== 'UUID') {
        return false;
      }

      if (!firstUuidFound) {
        firstUuidFound = true;
        return false;
      }

      return true;
    });

    const protectionClassKeys = entries.splice(firstKeyIndex);

    // Set keybag attributes
    this.attributes = {};
    entries.forEach((data) => {
      this.attributes[data.tag] = data.value;
    });

    // Convert tag/value pairs into Key objects
    this.protectionClassKeys = parseProtectionClassKeys(protectionClassKeys);
  }

  async unlock(password) {
    const key = await calculateKeyBagKey(password, {
      key1: {
        salt: this.attributes.DPSL,
        iterations: this.attributes.DPIC,
      },
      key2: {
        salt: this.attributes.SALT,
        iterations: this.attributes.ITER,
      },
    });

    this.protectionClassKeys.forEach(protectionClassKey => protectionClassKey.unwrap(key));
  }

  getClassKey(protectionClass) {
    const protectionClassKey = this.protectionClassKeys
      .find(key => key.protectionClass === protectionClass);

    if (!protectionClassKey) {
      throw new Error(`No key found for protection class ${protectionClass}`);
    }

    return protectionClassKey;
  }

  unwrapKeyForClass(key, protectionClass) {
    const protectionClassKey = this.getClassKey(protectionClass);
    return aesKeyWrap.decrypt(protectionClassKey.toBuffer(), key);
  }
}
