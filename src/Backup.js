import path from 'path';
import plist from './util/plist';

import KeyBag from './KeyBag';
import Manifest from './Manifest';


/**
 * How should the API be?
 * const backup = new Backup(path);
 * backup.isEncrypted() => Promise
 * backup.unlock(password)
 * backup.files() => Promise (returns array of files)
 * backup.extract(dest) => Promise
 * backup.extractFile(file, dest) => Promise
 */
export default function Backup(backupPath, manifestMetadata) {
  const keyBag = new KeyBag(manifestMetadata.BackupKeyBag);
  let backupManifest;

  Object.defineProperty(this, 'isEncrypted', {
    value: manifestMetadata.IsEncrypted,
  });

  async function getManifest() {
    if (!backupManifest) {
      backupManifest = await Manifest.fromEncryptedFile(
        path.resolve(backupPath, 'Manifest.db'),
        keyBag,
        manifestMetadata.ManifestKey,
      );
    }

    return backupManifest;
  }

  this.unlock = function unlock(password) {
    return keyBag.unlock(password);
  };

  this.files = async function files() {
    const manifest = await getManifest();
    return manifest.files;
  };
}

Backup.create = async function create(backupPath) {
  const manifestMetadata = await plist.load(path.resolve(backupPath, 'Manifest.plist'));
  return new Backup(backupPath, manifestMetadata);
};
