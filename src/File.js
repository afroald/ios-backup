import plist from './util/plist';

export default function File({ id, domain, path, flags, file }) {
  this.id = id;
  this.domain = domain;
  this.path = path;
  this.flags = flags;

  let parsedFile = null;

  Object.defineProperty(this, 'file', {
    get() {
      if (!parsedFile) {
        parsedFile = plist.parse(file);
      }

      return parsedFile;
    },
  });
}
