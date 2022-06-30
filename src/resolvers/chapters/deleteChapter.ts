import { UnauthorizedError } from '../../errors';
import { ResolverHandler } from '../../types/server';

type Args = {
  id: number;
};

const deleteChapter: ResolverHandler = ({ database }) => {
  return async (_p, { id }: Args, { user }) => {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    await database('chapters')
      .delete('*')
      .where({ id });

    return {
      status: 'OK',
    }
  };
};

export default deleteChapter;