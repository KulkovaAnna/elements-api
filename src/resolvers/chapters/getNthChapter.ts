import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  order: number;
};

const getChapter: ResolverHandler = () => {
  return async function (_, { order }: Args) {
    const result = await Chapter.findOne({ where: { order } });
    return result;
  };
};

export default getChapter;
