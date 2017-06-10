import crypto from 'crypto';
import promisify from '../../util/promisify';

const pbkdf2 = promisify(crypto.pbkdf2);
export default pbkdf2;
