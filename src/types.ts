import { User } from './models';

export type ResolverHandlerParams = {};

export type ResolverContext = {
  user: Omit<User, 'password'>;
};

export type ResolverHandler = (
  data?: ResolverHandlerParams
) => (
  parent: ParentNode,
  args: { [key: string]: any },
  context: ResolverContext,
  info: any
) => Promise<any>;

export type CreateResolver = (data?: ResolverHandlerParams) => {
  Query?: {
    [resolver: string]: (...args: any) => Promise<ResolverHandler>;
  };
  Mutation?: {
    [resolver: string]: (...args: any) => Promise<ResolverHandler>;
  };
};
