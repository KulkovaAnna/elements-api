import { CreateResolver } from '../../types';
import getCharacterById from './getCharacterById';
import getCharacters from './getCharacters';

const charactersResolver: CreateResolver = function ({ storage }) {
  return {
    Query: {
      getCharacters: getCharacters({ storage }),
      getCharacterById: getCharacterById({ storage }),
    },
  };
};
export default charactersResolver;
