import fs from 'fs-extra';
import { FileUpload } from 'graphql-upload';
import { finished } from 'stream/promises';

export function saveFile(
  file: FileUpload,
  path: string,
  callback: () => void = null
) {
  const stream = file.createReadStream();
  const out = fs.createWriteStream(path);
  stream.pipe(out);
  finished(out).then(() => callback?.());
}
