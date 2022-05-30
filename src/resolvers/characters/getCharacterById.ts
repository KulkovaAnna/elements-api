import { Character } from '../../types/models';
import { ResolverHandler } from '../../types/server';

type Args = {
  id: number;
};

const getCharacterById: ResolverHandler = ({ database }) => {
  return async function (_, { id }: Args) {
    const [result] = await database('characters')
      .select<Character[]>()
      .where({ id });
    const family = await database('relationships')
      .join('characters', 'characters.id', 'relationships.relative_id')
      .select('relationships.id', 'relative_id', 'name', 'related_as')
      .where({ char_id: id });
    if (!result) {
      return null;
    }
    return { ...result, family };
  };
};

export default getCharacterById;
