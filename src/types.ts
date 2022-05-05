import { NextFunction, Request, Response, Router } from 'express';
import { StorageEngine } from 'multer';

type RouteHandlerParams = {
  storage: StorageEngine;
};

type ResolverHandlerParams = {
  storage: StorageEngine;
};

export type RouteHandler = (
  data: RouteHandlerParams
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type ResolverHandler = (
  data: ResolverHandlerParams
) => (
  parent: ParentNode,
  args: { [key: string]: any },
  context: any,
  info: any
) => Promise<any>;

export type CreateRouter = (data: RouteHandlerParams) => Router;

export type CreateResolver = (data: ResolverHandlerParams) => {
  Query?: {
    [resolver: string]: (...args: any) => Promise<ResolverHandler>;
  };
  Mutation?: {
    [resolver: string]: (...args: any) => Promise<ResolverHandler>;
  };
};
