import { UnauthorizedError } from '../../errors';
import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  id: number;
  input: {
    title?: string;
    content?: string;
    order: number;
  };
};

const updateChapter: ResolverHandler = () => {
  return async function (_, { id, input }: Args, { user }) {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    const result = await Chapter.update(
      {
        ...input,
      },
      {
        where: {
          id,
        },
      }
    );
    return result;
  };
};

export default updateChapter;
