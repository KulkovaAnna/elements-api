import { UnauthorizedError } from '../../errors';
import { ResolverHandler } from '../../types/server';
import { Chapter } from '../../types/models';

type Args = {
  input: {
    title?: string;
    content?: string;
    order: number;
  };
};

const addChapter: ResolverHandler = ({ database }) => {
  return async function (_, { input }: Args, { user }) {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    const result: Chapter[] = await database('chapters').insert(input, '*');
    return result[0];
  };
};

export default addChapter;
