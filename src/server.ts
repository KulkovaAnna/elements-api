import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import getResolvers from './resolvers';
import schema from './schemas';
import getPayload from './utils/getPayload';
import database from './database';
import { HOST } from '../config';
const corsOptions = {
  origin: '*',
};

const resolversData = { database };
class Server {
  private app: Express = null;

  constructor() {
    this.app = express();
    this.app.use(express.static('storage'));
    this.app.use(graphqlUploadExpress());
  }

  public start = async (port: number) => {
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: getResolvers(resolversData),
      context: ({ req }) => {
        const token = req.headers.authorization || '';
        const { payload: user } = getPayload(token);
        return { user };
      },
    });
    await server.start();
    server.applyMiddleware({
      app: this.app,
      cors: corsOptions,
      bodyParserConfig: { limit: '1mb' },
    });
    this.app.listen({ port }, () => {
      console.debug(
        `🚀 Server ready at ${HOST}:${port}${server.graphqlPath}`
      );
    });
  };
}

export default Server;
