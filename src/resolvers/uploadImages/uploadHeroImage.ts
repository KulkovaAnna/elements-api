import { Upload } from 'graphql-upload';
import { storage_path } from '../../../config';
import { UnauthorizedError } from '../../errors';
import Character from '../../models/character.model';
import { ResolverHandler } from '../../types';
import { saveFile } from '../../utils/fileUploading';

type Args = {
  id: number;
  file: Upload;
};

const uploadHeroImage: ResolverHandler = () => {
  return async function (_parent, { id, file: fileUpload }: Args, { user }) {
    if (!user || !user?.isAdmin) {
      throw new UnauthorizedError();
    }
    const relativePath = `/images/characters/${id}/hero/image.png`;
    const dir = `${storage_path}/images/characters/${id}/hero/image.png`;
    const { file } = fileUpload;
    saveFile(file, dir);
    const [_, chars] = await Character.update(
      {
        hero_image: relativePath,
      },
      { where: { id }, returning: true }
    );
    return chars[0].get();
  };
};

export default uploadHeroImage;
