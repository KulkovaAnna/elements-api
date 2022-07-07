import { Upload } from 'graphql-upload';
import { STORAGE_PATH } from '../../../config';
import { BadRequestError, UnauthorizedError } from '../../errors';
import { Character } from '../../types/models';
import { ResolverHandler } from '../../types/server';
import { saveFile } from '../../utils/fileUploading';

type Args = {
  id: number;
  type: 'hero' | 'thumbnail';
  file: Upload;
};

const uploadImage: ResolverHandler = ({ database }) => {
  return async (_parent, { id, file: fileUpload, type }: Args, { user }) => {
    if (!user || !user?.isAdmin) {
      throw new UnauthorizedError();
    }
    const [ch] = await database('characters').select('id').where({ id });
    if (!ch) {
      throw new BadRequestError("Character doesn't exist");
    }
    const relativePath = `/images/characters/${id}/${type}`;
    const dir = `${STORAGE_PATH}/images/characters/${id}/${type}`;
    const { file } = fileUpload;
    saveFile(file, dir);
    const [char]: Character[] = await database('characters')
      .update(
        {
          [`${type}_image`]: `${relativePath}/image.png`,
        },
        '*'
      )
      .where({ id });

    return char;
  };
};

export default uploadImage;
