import { Request, Response } from 'express';
import fs from 'fs-extra';
import { storage_path } from '../../../config';
import Character from '../../models/character.model';
import { RouteHandler } from '../../types';

const uploadHeroImage: RouteHandler = () => {
  return async function (req: Request, res: Response) {
    const id = req.params.id;
    const relativePath = `/images/characters/${id}/hero/image.png`;
    const dir = `${storage_path}/images/characters/${id}/hero/image.png`;
    const fileName = req.file.filename;
    const move = () => moveFile(fileName, dir);
    try {
      fs.removeSync(dir);
      move();
    } catch {
      move();
    }
    const [_, chars] = await Character.update(
      {
        hero_image:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:5000/${relativePath}`
            : dir,
      },
      { where: { id }, returning: true }
    );
    res.status(200).json(chars[0].get());
  };
};

function moveFile(fileName: string, dest: string) {
  fs.moveSync(`./tmp/${fileName}`, dest);
}
export default uploadHeroImage;
