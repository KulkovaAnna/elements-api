import { CreateResolver } from '../../types/server';
import addChapter from './addChapter';
import getNthChapter from './getNthChapter';
import getChapters from './getChapters';
import updateChapter from './updateChapter';

const chaptersResolver: CreateResolver = (data) => {
  return {
    Query: {
      getNthChapter: getNthChapter(data),
      getChapters: getChapters(data),
    },
    Mutation: {
      addChapter: addChapter(data),
      updateChapter: updateChapter(data),
    },
  };
};
export default chaptersResolver;
