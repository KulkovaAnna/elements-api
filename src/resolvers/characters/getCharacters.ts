import { Character } from "../../types/models";
import { ResolverHandler } from "../../types/server";
const getCharacters: ResolverHandler = ({ database }) => {
  return async () => {
    const result: Character[] = await database("characters")
      .select()
      .orderBy("id");
    return result;
  };
};

export default getCharacters;
