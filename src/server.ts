import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import database from './database';
import { CharacterMap, UserMap } from './models';
import {
  charactersResolver,
  uploadImagesResolver,
  usersResolver,
} from './resolvers';
import { characterSchema, userSchema } from './schemas';
import getPayload from './utils/getPayload';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const resolversData = {};

class Server {
  private app: Express = null;

  constructor() {
    this.app = express();
    this.app.use(express.static('storage'));
    this.app.use(graphqlUploadExpress());
  }

  public start = async (port: number) => {
    const server = new ApolloServer({
      typeDefs: [characterSchema, userSchema],
      resolvers: [
        charactersResolver(resolversData),
        uploadImagesResolver(resolversData),
        usersResolver(resolversData),
      ],
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
      console.log(
        `🚀 Server ready at http://localhost:5000${server.graphqlPath}`
      );
      CharacterMap(database);
      UserMap(database);
    });
  };
}

export default Server;
