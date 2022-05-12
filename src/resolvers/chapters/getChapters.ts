import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  input: {
    from?: number;
    limit?: number;
  };
};

const getChapters: ResolverHandler = function () {
  return async function (_parent, { input }: Args) {
    const { from = 0, limit } = input ?? {};
    const count = await Chapter.count();
    const result = {
      total: count,
      chapters: [],
      nextOrder: 1,
    };
    result.chapters = await Chapter.findAll({
      order: ['order'],
      offset: from,
      limit,
    });
    if (limit === undefined || limit >= count) {
      result.nextOrder = null;
    } else {
      result.nextOrder = limit + 1;
    }
    return result;
  };
};

export default getChapters;
