import { Character } from '../../types/models';
import { ResolverHandler } from '../../types/server';
const getCharacters: ResolverHandler = function ({ database }) {
  return async function () {
    const result: Character[] = await database('characters').select();
    return result;
  };
};

export default getCharacters;
