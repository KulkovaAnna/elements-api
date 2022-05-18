import { UnauthorizedError } from '../../errors';
import { Chapter } from '../../types/models';
import { ResolverHandler } from '../../types/server';

type Args = {
  id: number;
  input: {
    title?: string;
    content?: string;
    order?: number;
  };
};

const updateChapter: ResolverHandler = ({ database }) => {
  return async function (_p, { id, input }: Args, { user }) {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    const chapters: Chapter[] = await database('chapters')
      .update(input, '*')
      .where({ id });

    return chapters[0];
  };
};

export default updateChapter;
