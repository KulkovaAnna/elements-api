import { CreateResolver } from "../../types/server";
import addCharacter from "./addCharacter";
import deleteCharacter from "./deleteCharacter";
import getCharacterById from "./getCharacterById";
import getCharacters from "./getCharacters";
import updateCharacter from "./updateCharacter";

const charactersResolver: CreateResolver = (data) => {
  return {
    Query: {
      getCharacters: getCharacters(data),
      getCharacterById: getCharacterById(data),
    },
    Mutation: {
      addCharacter: addCharacter(data),
      updateCharacter: updateCharacter(data),
      deleteCharacter: deleteCharacter(data),
    },
  };
};
export default charactersResolver;
