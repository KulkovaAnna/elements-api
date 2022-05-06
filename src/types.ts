type ResolverHandlerParams = {};

export type ResolverHandler = (
  data: ResolverHandlerParams
) => (
  parent: ParentNode,
  args: { [key: string]: any },
  context: any,
  info: any
) => Promise<any>;

export type CreateResolver = (data: ResolverHandlerParams) => {
  Query?: {
    [resolver: string]: (...args: any) => Promise<ResolverHandler>;
  };
  Mutation?: {
    [resolver: string]: (...args: any) => Promise<ResolverHandler>;
  };
};
