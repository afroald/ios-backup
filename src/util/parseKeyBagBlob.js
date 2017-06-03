export default function parseKeybagBlob(blob) {
  const data = [];
  let pointer = 0;

  while (pointer + 8 < blob.length) {
    const tag = blob.toString('utf-8', pointer, pointer + 4);
    const length = blob.readUIntBE(pointer + 4, 4);
    let value = blob.slice(pointer + 8, pointer + 8 + length);

    if (value.length === 4) {
      value = value.readUIntBE(0, value.length);
    }

    data.push({ tag, value });

    pointer += 8 + length;
  }

  return data;
}
