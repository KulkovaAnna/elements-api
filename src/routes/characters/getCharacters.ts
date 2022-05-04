import { Request, Response } from 'express';
import Character from '../../models/character.model';
import { RouteHandler } from '../../types';
const getCharacters: RouteHandler = function () {
  return async function (_req: Request, res: Response) {
    const result = await Character.findAll();
    res.status(200).json(result);
  };
};

export default getCharacters;
