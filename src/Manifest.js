import Database from 'better-sqlite3';
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
        plistBlob: file.file,
      }));
    },
  });
}

Manifest.create = async function create(databasePath) {
  return new Manifest(databasePath);
};

Manifest.fromEncryptedFile = async function fromEncryptedFile(databasePath, keyBag, key) {
  const protection = new FileProtection({
    path: databasePath,
    key: key.slice(4),
    protectionClass: FileProtectionClasses.NSFileProtectionNone,
    keyBag,
  });

  const decryptedDatabaseFile = await SelfDestructingTmpFile.create(protection.getReadStream());

  return Manifest.create(decryptedDatabaseFile.path);
};
