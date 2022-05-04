import { NextFunction, Request, Response, Router } from 'express';
import { StorageEngine } from 'multer';

type RouteHandlerParams = {
  storage: StorageEngine;
};

export type RouteHandler = (
  data: RouteHandlerParams
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type CreateRouter = (data: RouteHandlerParams) => Router;
