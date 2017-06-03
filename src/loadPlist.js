import plist from 'simple-plist';

async function loadPlist(path) {
  return new Promise((resolve, reject) => {
    plist.readFile(path, (error, data) => {
      if (error) {
        return reject(error);
      }

      return resolve(data);
    });
  });
}

export default loadPlist;
