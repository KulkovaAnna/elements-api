import { Request, Response } from 'express';
import Character from '../../models/character.model';
import { RouteHandler } from '../../types';

const getCharacterById: RouteHandler = () => {
  return async function (req: Request, res: Response) {
    const result = await Character.findOne({ where: { id: req.params?.id } });
    res.status(200).json(result);
  };
};

export default getCharacterById;
