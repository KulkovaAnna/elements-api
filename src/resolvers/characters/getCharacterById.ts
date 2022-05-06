import Character from '../../models/character.model';
import { ResolverHandler } from '../../types';

type Args = {
  id: number;
};

const getCharacterById: ResolverHandler = () => {
  return async function (_, { id }: Args) {
    const result = await Character.findOne({ where: { id } });
    return result;
  };
};

export default getCharacterById;
