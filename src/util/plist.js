import plist from 'simple-plist';
import promisify from './promisify';

const plistUtil = {
  load: promisify(plist.readFile),
  parse: plist.parse,
};

export default plistUtil;
