import { Request, Response } from 'express';
import Character from '../../models/character.model';
export default async function getCharacters(req: Request, res: Response) {
  // TO DO
  const result = await Character.findAll();
  res.status(200).json({ characters: result });
}
