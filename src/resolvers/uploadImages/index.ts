import { CreateResolver } from '../../types/server';
import uploadImage from './uploadImage';
const charactersResolver: CreateResolver = (data) => {
  return {
    Mutation: {
      uploadImage: uploadImage(data),
    },
  };
};
export default charactersResolver;
