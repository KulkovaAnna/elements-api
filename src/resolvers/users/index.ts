import { CreateResolver } from '../../types/server';
import signIn from './signIn';
import signUp from './signUp';

const charactersResolver: CreateResolver = function (data) {
  return {
    Query: {
      signIn: signIn(data),
    },
    Mutation: {
      signUp: signUp(data),
    },
  };
};
export default charactersResolver;
