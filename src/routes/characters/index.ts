import { Router } from 'express';
import getCharacters from './getCharacters';
const router = Router();

router.get('/', getCharacters);

export default router;
