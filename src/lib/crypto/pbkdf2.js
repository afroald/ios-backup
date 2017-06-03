import crypto from 'crypto';

function pbkdf2(...args) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(...args, (error, key) => {
      if (error) {
        return reject(error);
      }

      return resolve(key);
    });
  });
}

export default pbkdf2;
