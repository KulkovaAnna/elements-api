import { CreateResolver } from '../../types/server';
import uploadHeroImage from './uploadHeroImage';
const charactersResolver: CreateResolver = (data) => {
  return {
    Mutation: {
      uploadHeroImage: uploadHeroImage(data),
    },
  };
};
export default charactersResolver;
