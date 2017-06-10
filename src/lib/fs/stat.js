import fs from 'fs';
import promisify from '../../util/promisify';

const stat = promisify(fs.stat);
export default stat;
