import { UnauthorizedError } from '../../errors';
import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';

type Args = {
  input: {
    title?: string;
    content?: string;
    order: number;
  };
};

const addChapter: ResolverHandler = () => {
  return async function (_, { input }: Args, { user }) {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    const result = await Chapter.create({
      ...input,
    });
    return result;
  };
};

export default addChapter;
