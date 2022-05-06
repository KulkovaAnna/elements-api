import { Chapter } from '../../models';
import { ResolverHandler } from '../../types';
const getChapters: ResolverHandler = function () {
  return async function () {
    const result = await Chapter.findAll();
    return result;
  };
};

export default getChapters;
