import fs from 'fs-extra';
import multer, { StorageEngine } from 'multer';

class StorageService {
  private _storage: StorageEngine;
  constructor() {
    this._storage = multer.diskStorage({
      destination: (_req, _file, callback) => {
        const dest = `./tmp/`;
        createDir(dest);
        callback(null, dest);
      },
      filename: (_req, file, callback) => {
        callback(null, file.originalname);
      },
    });
  }

  get storage() {
    return this._storage;
  }
}

function createDir(path: string) {
  let stat = null;
  try {
    stat = fs.statSync(path);
  } catch (err) {
    fs.mkdirSync(path);
  }
  if (stat && !stat.isDirectory()) {
    throw new Error('Directory cannot be created');
  }
}

export default StorageService;
