import { UnauthorizedError } from "../../errors";
import { ResolverHandler } from "../../types/server";
import { deleteFile } from "../../utils/fileUploading";

type Args = {
  id: number;
};

const deleteCharacter: ResolverHandler = ({ database }) => {
  return async (_p, { id }: Args, { user }) => {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    await database("relationships")
      .delete()
      .where({ char_id: id })
      .orWhere({ relative_id: id });

    await database("characters").delete("*").where({ id });

    const path = `${process.env.STORAGE_PATH}/images/characters/${id}`;

    deleteFile(path);

    return {
      status: "OK",
    };
  };
};

export default deleteCharacter;
