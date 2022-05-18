import { Character } from '../../types/models';
import { ResolverHandler } from '../../types/server';

type Args = {
  id: number;
};

const getCharacterById: ResolverHandler = ({ database }) => {
  return async function (_, { id }: Args) {
    const [result]: Character[] = await database('characters')
      .select()
      .where({ id });
    return result;
  };
};

export default getCharacterById;
