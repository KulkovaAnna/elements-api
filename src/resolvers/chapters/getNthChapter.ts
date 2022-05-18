import { ResolverHandler } from '../../types/server';

type Args = {
  order: number;
};

const getChapter: ResolverHandler = ({ database }) => {
  return async function (_, { order }: Args) {
    const [{ count }] = await database('chapters').count('id');
    const [chapter] = await database
      .select('*')
      .from('chapters')
      .where({ order });
    const result = {
      chapter,
      next: order + 1 > count ? null : order + 1,
      prev: order - 1 <= 0 ? null : order - 1,
      total: count,
    };

    return result;
  };
};

export default getChapter;
