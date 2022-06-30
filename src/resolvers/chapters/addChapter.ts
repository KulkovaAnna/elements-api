import { BadRequestError, UnauthorizedError } from '../../errors';
import { ResolverHandler } from '../../types/server';
import { Chapter } from '../../types/models';
import isInteger from 'lodash.isinteger'

type Args = {
  input: {
    title?: string;
    content?: string;
    order: number;
  };
};

const addChapter: ResolverHandler = ({ database }) => {
  return async (_, { input }: Args, { user }) => {
    if (!user || !user.isAdmin) {
      throw new UnauthorizedError();
    }
    if (input.order < 1 || !isInteger(input.order)) {
      throw new BadRequestError('Номер главы должен быть целым положительным числом')
    }
    try {
      const result: Chapter[] = await database('chapters').insert(input, '*');
      return result[0];
    } catch(err) {
      if(err.routine === '_bt_check_unique') {  
        throw new BadRequestError('Такая глава уже существует')
      }
      else {
        throw new Error(err);
      }
    }
  };
};

export default addChapter;
