import { CreateResolver } from '../../types/server';
import addChapter from './addChapter';
import getNthChapter from './getNthChapter';
import getChapters from './getChapters';
import updateChapter from './updateChapter';
import getChapterById from './getChapterById';
import deleteChapter from './deleteChapter';

const chaptersResolver: CreateResolver = (data) => {
  return {
    Query: {
      getNthChapter: getNthChapter(data),
      getChapters: getChapters(data),
      getChapterById: getChapterById(data),
    },
    Mutation: {
      addChapter: addChapter(data),
      updateChapter: updateChapter(data),
      deleteChapter: deleteChapter(data)
    },
  };
};
export default chaptersResolver;
