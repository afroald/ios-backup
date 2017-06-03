import chunk from './chunk';
import ProtectionClassKey from '../ProtectionClassKey';

export default function parseProtectionClassKeys(entries) {
  const chunks = chunk(entries, 5);
  const keys = chunks.map((data) => {
    const key = {};

    data.forEach(({ tag, value }) => {
      key[tag] = value;
    });

    return new ProtectionClassKey({
      uuid: key.UUID,
      protectionClass: key.CLAS,
      wrap: key.WRAP,
      ktyp: key.KTYP,
      wrappedKey: key.WPKY,
    });
  });

  return keys;
}
