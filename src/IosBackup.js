import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import KeyBag from './KeyBag';
import { protectionClasses } from './ProtectionClassKey';
import loadPlist from './loadPlist';

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

class IosBackup {
  constructor(backupPath) {
    this.paths = {
      backup: path.resolve(backupPath),
    };

    this.paths.manifestMetadataFile = path.resolve(this.paths.backup, 'Manifest.plist');

    try {
      fs.statSync(this.paths.manifestMetadataFile);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error('Manifest.plist not found. Are you sure this is an iOS backup?');
      }
    }
  }

  async getManifestMetadata() {
    if (!this.manifestMetadata) {
      this.manifestMetadata = await loadPlist(this.paths.manifestMetadataFile);
    }

    return this.manifestMetadata;
  }

  async getKeyBag() {
    const manifestMetadata = await this.getManifestMetadata();

    if (!this.keyBag) {
      this.keyBag = new KeyBag(manifestMetadata.BackupKeyBag);
    }

    return this.keyBag;
  }

  async decryptManifestDatabase() {
    const metadata = await this.getManifestMetadata();
    const keyBag = await this.getKeyBag();

    const wrappedKey = metadata.ManifestKey.slice(4);
    const key = keyBag.unwrapKeyForClass(wrappedKey, protectionClasses.NSFileProtectionNone);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, zeroIv);

    const input = fs.createReadStream(path.resolve(this.paths.backup, 'Manifest.db'));
    const output = fs.createWriteStream(path.resolve(__dirname, 'Manifest.db'));
    input.pipe(decipher).pipe(output);
  }
}

export default IosBackup;
