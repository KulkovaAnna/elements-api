import { CreateResolver } from '../../types';
import getCharacterById from './getCharacterById';
import getCharacters from './getCharacters';

const charactersResolver: CreateResolver = function (data) {
  return {
    Query: {
      getCharacters: getCharacters(data),
      getCharacterById: getCharacterById(data),
    },
  };
};
export default charactersResolver;
