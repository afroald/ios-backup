import fs from 'fs';

export default function mkdtemp(...args) {
  return new Promise((resolve, reject) => {
    fs.mkdtemp(...args, (error, folder) => {
      if (error) {
        return reject(error);
      }

      return resolve(folder);
    });
  });
}
