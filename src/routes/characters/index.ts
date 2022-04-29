import { Router } from 'express';
import getCharacterById from './getCharacterById';
import getCharacters from './getCharacters';
const router = Router();

router.get('/', getCharacters);
router.get('/:id', getCharacterById);

export default router;
