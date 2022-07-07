import { Upload } from "graphql-upload";
import { STORAGE_PATH } from "../../../config";
import { UnauthorizedError } from "../../errors";
import { Character, Family } from "../../types/models";
import { ResolverHandler } from "../../types/server";
import { deleteFile, saveFile } from "../../utils/fileUploading";
import getRelative from "../../utils/getRelative";

type Args = {
  main_info: Omit<
    Character,
    "id" | "hero_image" | "thumbnail_image" | "family"
  >;
  images?: {
    hero?: Upload;
    thumbnail?: Upload;
  };
  family?: Omit<Family, "id" | "char_id">[];
};

const addCharacter: ResolverHandler = ({ database }) => {
  return async (_, { main_info, images, family }: Args, { user }) => {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }

    let [char] = await database("characters").insert(main_info, "*");
    try {
      if (family) {
        const mainFamilyToAdd = family.reduce((acc, rel) => {
          acc.push(
            {
              char_id: char.id,
              relative_id: rel.relative_id,
              related_as: rel.related_as,
            },
            {
              char_id: rel.relative_id,
              relative_id: char.id,
              related_as: getRelative(main_info.sex, rel.related_as),
            }
          );
          return acc;
        }, []);
        await database("relationships").insert(mainFamilyToAdd);
        const charFamily = await database("relationships")
          .join("characters", "characters.id", "relationships.relative_id")
          .select("relationships.id", "relative_id", "name", "related_as")
          .where({ char_id: char.id });
        char = { ...char, family: charFamily };
      }
      if (images) {
        for (const key in images) {
          if (images[key] !== null) {
            const relativePath = `/images/characters/${char.id}/${key}`;
            const { file } = images[key];
            saveFile(file, STORAGE_PATH + relativePath);
            const [upd] = await database("characters")
              .update({ [`${key}_image`]: `${relativePath}/image.png` }, "*")
              .where({ id: char.id });
            char = { ...char, ...upd };
          }
        }
      }
      return char;
    } catch (err) {
      await database("relationships")
        .delete()
        .where({ char_id: char.id })
        .orWhere({ relative_id: char.id });
      database("characters").delete().where({ id: char.id });
      deleteFile(`${STORAGE_PATH}/images/characters/${char.id}`);
      throw new Error(err);
    }
  };
};

export default addCharacter;
