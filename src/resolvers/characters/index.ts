import { CreateResolver } from '../../types';
import getCharacterById from './getCharacterById';
import getCharacters from './getCharacters';

const charactersResolver: CreateResolver = function () {
  return {
    Query: {
      getCharacters: getCharacters({}),
      getCharacterById: getCharacterById({}),
    },
  };
};
export default charactersResolver;
