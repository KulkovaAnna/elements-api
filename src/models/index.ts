export { default as Chapter } from './chapter.model';
export { default as Character } from './character.model';
export { default as User } from './user.model';

import { Sequelize } from 'sequelize/types';
import { ChapterMap } from './chapter.model';
import { CharacterMap } from './character.model';
import { UserMap } from './user.model';

export default function (database: Sequelize) {
  ChapterMap(database);
  CharacterMap(database);
  UserMap(database);
}
