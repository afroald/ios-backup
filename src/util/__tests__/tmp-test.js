/* eslint-env node, jest */

import fs from 'fs';
import tmp from '../tmp';

describe('tmp', () => {
  it('returns a path', async () => {
    const path = await tmp.write('test');
    expect(path).toBeDefined();
    tmp.cleanup();
  });

  it('removes all files on cleanup', async () => {
    const path = await tmp.write('test');
    tmp.cleanup();
    expect(() => {
      fs.statSync(path);
    }).toThrowError(/ENOENT/);
  });
});
