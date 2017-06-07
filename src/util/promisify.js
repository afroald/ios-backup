import createNamedFunction from './createNamedFunction';

export default function promisify(func) {
  return createNamedFunction(func.name, (...args) => {
    return new Promise((resolve, reject) => {
      func(...args, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  });
}
