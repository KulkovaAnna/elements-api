import { Router } from 'express';
import { CreateRouter } from '../../types';
import getCharacterById from './getCharacterById';
import getCharacters from './getCharacters';

const createRouter: CreateRouter = ({ storage }) => {
  const router = Router();

  router.get('/', getCharacters({ storage }));
  router.get('/:id', getCharacterById({ storage }));

  return router;
};

export default createRouter;
