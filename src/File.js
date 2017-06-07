import plist from './util/plist';

export default class File {
  constructor({ id, domain, path, plistBlob }) {
    this.id = id;
    this.domain = domain;
    this.path = path;
    this.plistBlob = plistBlob;
  }
}
