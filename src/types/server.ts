import { Knex } from 'knex';
import { User } from './models';

export type ResolverHandlerParams = {
  database: Knex;
};

export type ResolverContext = {
  user: Omit<User, 'password'>;
};

export type Resolver = (
  parent: ParentNode,
  args: { [key: string]: unknown },
  context: ResolverContext
) => Promise<unknown>;

export type ResolverHandler = (data?: ResolverHandlerParams) => Resolver;

export type CreateResolver = (data?: ResolverHandlerParams) => {
  Query?: {
    [resolver: string]: Resolver;
  };
  Mutation?: {
    [resolver: string]: Resolver;
  };
};
