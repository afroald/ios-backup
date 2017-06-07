import plist from 'simple-plist';
import promisify from './promisify';

const plistUtil = {
  load: promisify(plist.readFile),
  parse: promisify(plist.parse),
};

export default plistUtil;
