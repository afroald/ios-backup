import fs from 'fs';

function readFile(...args) {
  return new Promise((resolve, reject) => {
    fs.readFile(...args, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    })
  });
}

export default readFile;
