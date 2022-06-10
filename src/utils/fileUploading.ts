import fs from 'fs-extra';
import { FileUpload } from 'graphql-upload';
import { finished } from 'stream/promises';

export function saveFile(
  file: FileUpload,
  path: string,
  callback: () => void = null
) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  const stream = file.createReadStream();
  const out = fs.createWriteStream(`${path}/image.png`);
  stream.pipe(out);
  finished(out).then(() => callback?.());
}
