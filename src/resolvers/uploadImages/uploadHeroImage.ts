import { Upload } from 'graphql-upload';
import { SRORAGE_PATH } from '../../../config';
import { UnauthorizedError } from '../../errors';
import { Character } from '../../types/models';
import { ResolverHandler } from '../../types/server';
import { saveFile } from '../../utils/fileUploading';

type Args = {
  id: number;
  file: Upload;
};

const uploadHeroImage: ResolverHandler = ({ database }) => {
  return async (_parent, { id, file: fileUpload }: Args, { user }) => {
    if (!user || !user?.isAdmin) {
      throw new UnauthorizedError();
    }
    const relativePath = `/images/characters/${id}/hero/image.png`;
    const dir = `${SRORAGE_PATH}/images/characters/${id}/hero/image.png`;
    const { file } = fileUpload;
    saveFile(file, dir);
    const [char]: Character[] = await database('characters')
      .update(
        {
          hero_image: relativePath,
        },
        '*'
      )
      .where({ id });

    return char;
  };
};

export default uploadHeroImage;
