import { CreateResolver } from '../../types';
import addChapter from './addChapter';
import getChapterById from './getChapterById';
import getChapters from './getChapters';
import updateChapter from './updateChapter';

const chaptersResolver: CreateResolver = function (data) {
  return {
    Query: {
      getChapterById: getChapterById(data),
      getChapters: getChapters(data),
    },
    Mutation: {
      addChapter: addChapter(data),
      updateChapter: updateChapter(data),
    },
  };
};
export default chaptersResolver;
