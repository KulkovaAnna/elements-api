import { Router } from 'express';
import multer from 'multer';
import { CreateRouter } from '../../types';
import uploadHeroImage from './uploadHeroImage';

const createRouter: CreateRouter = ({ storage }) => {
  const router = Router();
  const heroUpload = multer({ storage });

  router.post(
    '/hero/:id',
    heroUpload.single('hero'),
    uploadHeroImage({ storage })
  );

  return router;
};

export default createRouter;
