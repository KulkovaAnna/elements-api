import { ResolverHandler } from '../../types/server';

type Args = {
  input: {
    from?: number;
    limit?: number;
  };
};

const getChapters: ResolverHandler = ({ database }) => {
  return async (_parent, { input }: Args) => {
    const { from = 0, limit } = input ?? {};
    const [{ count }] = await database('chapters').count('id');
    const result = {
      total: count,
      chapters: [],
      nextOrder: 1,
    };
    if (limit) {
      result.chapters = await database('chapters')
      .select('*')
      .offset(from)
      .limit(limit)
      .orderBy('order');
    } else {
      result.chapters = await database('chapters')
      .select('*')
      .offset(from)
      .orderBy('order');
    }
    if (limit === undefined || limit >= count) {
      result.nextOrder = null;
    } else {
      result.nextOrder = result.chapters[result.chapters.length - 1].order + 1;
    }
    return result;
  };
};

export default getChapters;
