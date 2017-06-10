import fs from 'fs';
import promisify from '../../util/promisify';

const writeFile = promisify(fs.writeFile);

export default writeFile;
