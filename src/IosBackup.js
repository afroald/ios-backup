import fs from 'fs';
import path from 'path';

import KeyBag from './KeyBag';
import Manifest from './Manifest';
import plist from './util/plist';

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
      this.manifestMetadata = await plist.load(this.paths.manifestMetadataFile);
    }

    return this.manifestMetadata;
  }

  async getKeyBag() {
    if (!this.keyBag) {
      const manifestMetadata = await this.getManifestMetadata();
      this.keyBag = new KeyBag(manifestMetadata.BackupKeyBag);
    }

    return this.keyBag;
  }

  async getManifest() {
    if (!this.manifest) {
      this.manifest = await Manifest.fromBackup(this);
    }

    return this.manifest;
  }
}

export default IosBackup;
