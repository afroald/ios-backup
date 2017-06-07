import path from 'path';
import sqlite from 'sqlite';
import File from './File';
import FileProtection from './FileProtection';
import FileProtectionClasses from './FileProtectionClasses';
import tmp from './util/tmp';

class Manifest {
  constructor(databasePath) {
    this.db = sqlite.open(databasePath);

    process.on('exit', () => {
      this.db.then((db) => {
        db.close();
      });
    });
  }

  async getFiles() {
    const db = await this.db;
    const files = await db.all('SELECT * FROM `Files`');
    return files.map(file => new File({
      id: file.fileID,
      domain: file.domain,
      path: file.relativePath,
      plistBlob: file.file,
    }));
  }
}

Manifest.fromBackup = async function fromBackup(backup) {
  const metadata = await backup.getManifestMetadata();
  const keyBag = await backup.getKeyBag();

  const protection = new FileProtection({
    path: path.resolve(backup.paths.backup, 'Manifest.db'),
    key: metadata.ManifestKey.slice(4),
    protectionClass: FileProtectionClasses.NSFileProtectionNone,
    keyBag,
  });

  const databasePath = await tmp.write(protection.getStream());

  return new Manifest(databasePath);
};

export default Manifest;
