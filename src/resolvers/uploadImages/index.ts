import { CreateResolver } from '../../types';
import uploadHeroImage from './uploadHeroImage';
const charactersResolver: CreateResolver = function () {
  return {
    Mutation: {
      uploadHeroImage: uploadHeroImage(),
    },
  };
};
export default charactersResolver;
