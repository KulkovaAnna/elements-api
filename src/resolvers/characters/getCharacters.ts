import Character from '../../models/character.model';
import { ResolverHandler } from '../../types';
const getCharacters: ResolverHandler = function () {
  return async function () {
    const result = await Character.findAll();
    return result;
  };
};

export default getCharacters;
