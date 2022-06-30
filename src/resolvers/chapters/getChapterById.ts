import { ResolverHandler } from '../../types/server';

type Args = {
  id: number;
};

const getChapter: ResolverHandler = ({ database }) => {
  return async (_, { id }: Args) => {
    const [{ count }] = await database('chapters').count('id');
    const [chapter] = await database
      .select('*')
      .from('chapters')
      .where({ id });

    const [nextChapter] = await database('chapters').select('id', 'order').where('order', '>', chapter.order ).orderBy('order');
    const [prevChapter] =  await database('chapters').select('id', 'order').where('order', '<', chapter.order ).orderBy('order', 'desc')
    const result = {
      chapter,
      next: nextChapter?.id ?? null,
      prev: prevChapter?.id ?? null,
      total: count,
    };

    return result;
  };
};

export default getChapter;