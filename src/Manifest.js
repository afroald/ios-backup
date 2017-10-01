import Database from 'better-sqlite3';
import semver from 'semver';

import File from './File';
import FileProtection, { FileProtectionClasses } from './FileProtection';
import SelfDestructingTmpFile from './SelfDestructingTmpFile';

export default function Manifest(databasePath) {
  const db = new Database(databasePath);

  process.on('exit', () => {
    db.close();
  });

  Object.defineProperty(this, 'files', {
    get() {
      const files = db.prepare('SELECT * from `Files`').all();

      return files.map(file => new File({
        id: file.fileID,
        domain: file.domain,
        path: file.relativePath,
        flags: file.flags,
        file: file.file,
      }));
    },
  });
}

Manifest.create = async function create(databasePath) {
  return new Manifest(databasePath);
};

Manifest.fromEncryptedFile = async function fromEncryptedFile(databasePath, metadata, keyBag) {
  const protectionClass = semver.gt(metadata.Lockdown.ProductVersion, '11.0.0') ?
    FileProtectionClasses.NSFileProtectionCompleteUntilFirstUserAuthentication :
    FileProtectionClasses.NSFileProtectionNone;

  const protection = new FileProtection({
    path: databasePath,
    key: metadata.ManifestKey.slice(4), // Remove length tag from key
    protectionClass,
    keyBag,
  });

  const decryptedDatabaseFile = await SelfDestructingTmpFile.create(protection.getReadStream());

  return Manifest.create(decryptedDatabaseFile.path);
};
