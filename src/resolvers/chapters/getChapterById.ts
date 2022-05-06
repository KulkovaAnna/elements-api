import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  id: number;
};

const getChapterById: ResolverHandler = () => {
  return async function (_, { id }: Args) {
    const result = await Chapter.findOne({ where: { id } });
    return result;
  };
};

export default getChapterById;
