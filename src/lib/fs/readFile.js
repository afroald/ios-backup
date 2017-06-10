import fs from 'fs';
import promisify from '../../util/promisify';

const readFile = promisify(fs.readFile);
export default readFile;
