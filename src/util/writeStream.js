import fs from 'fs';

// https://github.com/sindresorhus/temp-write/blob/master/index.js#L12
const writeStream = (filepath, input) => new Promise((resolve, reject) => {
  const writable = fs.createWriteStream(filepath);

  input
    .on('error', err => {
      // Be careful to reject before writable.end(), otherwise the writable's
      // 'finish' event will fire first and we will resolve the promise
      // before we reject it.
      reject(err);
      input.unpipe(writable);
      writable.end();
    })
    .pipe(writable)
    .on('error', reject)
    .on('finish', resolve);
});

export default writeStream;
