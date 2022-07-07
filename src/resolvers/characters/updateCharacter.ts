import { Upload } from "graphql-upload";
import { STORAGE_PATH } from "../../../config";
import { BadRequestError, UnauthorizedError } from "../../errors";
import { Character, Family } from "../../types/models";
import { ResolverHandler } from "../../types/server";
import { deleteFile, saveFile } from "../../utils/fileUploading";
import getRelative from "../../utils/getRelative";

type Args = {
  id: number;
  main_info: Omit<
    Character,
    "id" | "hero_image" | "thumbnail_image" | "family"
  >;
  images?: {
    hero?: Upload;
    thumbnail?: Upload;
  };
  family: Partial<Omit<Family, "char_id">>[];
};

const updateCharacter: ResolverHandler = ({ database }) => {
  return async (_, { id, main_info, images, family }: Args, { user }) => {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    const [oldChar] = await database("characters").select("*").where({ id });
    try {
      let [char] = await database("characters")
        .update(main_info, "*")
        .where({ id });
      if (!char) {
        throw new BadRequestError("Такого персонажа не существет");
      }

      await database("relationships")
        .delete()
        .where({
          char_id: char.id,
        })
        .orWhere({
          relative_id: char.id,
        });

      if (family) {
        if (family.length > 0) {
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
        }

        const charFamily = await database("relationships")
          .join("characters", "characters.id", "relationships.relative_id")
          .select("relationships.id", "relative_id", "name", "related_as")
          .where({ char_id: char.id });
        char = { ...char, family: charFamily };
      }
      if (images) {
        for (const key in images) {
          const path = `${STORAGE_PATH}/images/characters/${char.id}/${key}`;
          const { file } = images[key];
          if (images[key] === null) {
            deleteFile(path);
            const [upd] = await database("characters")
              .update({ [`${key}_image`]: null }, "*")
              .where({ id: char.id });
            char = { ...char, ...upd };
          } else {
            saveFile(file, path);
            if (!oldChar.hero_image) {
              await database("characters")
                .update(
                  {
                    [`${key}_image`]: `/images/characters/${char.id}/${key}/image.png`,
                  },
                  "*"
                )
                .where({ id: char.id });
            }
          }
        }
      }
      return char;
    } catch (err) {
      await database("characters").update(oldChar, "*").where({ id });
      throw new Error(err);
    }
  };
};

export default updateCharacter;
