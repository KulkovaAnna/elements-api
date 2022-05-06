import { UnauthorizedError } from '../../errors';
import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  id: number;
  input: {
    title?: string;
    content?: string;
    order?: number;
  };
};

const updateChapter: ResolverHandler = () => {
  return async function (_p, { id, input }: Args, { user }) {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    const [_n, chapter] = await Chapter.update(
      {
        ...input,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
    return chapter[0].get();
  };
};

export default updateChapter;
