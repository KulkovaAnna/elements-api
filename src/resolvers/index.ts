import { ResolverHandler, ResolverHandlerParams } from '../types';
import charactersResolver from './characters';
import uploadImagesResolver from './uploadImages';
import usersResolver from './users';
import chapterResolver from './chapters';

export default function getResolvers(data: ResolverHandlerParams) {
  return [
    charactersResolver(data),
    uploadImagesResolver(data),
    usersResolver(data),
    chapterResolver(data),
  ];
}
