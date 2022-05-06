import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { graphqlUploadExpress } from 'graphql-upload';
import http from 'http';
import database from './database';
import { CharacterMap } from './models/character.model';
import charactersResolver from './resolvers/characters';
import uploadImages from './resolvers/uploadImages';
import schema from './schemas/typeDefs';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
class Server {
  private app: Express = null;

  constructor() {
    this.app = express();
    this.app.use(express.static('storage'));
    this.app.use(graphqlUploadExpress());
  }

  public start = (port: number) => {
    const httpServer = http.createServer(this.app);
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: [charactersResolver({}), uploadImages({})],
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    server
      .start()
      .then(() => {
        server.applyMiddleware({
          app: this.app,
          cors: corsOptions,
          bodyParserConfig: { limit: '1mb' },
        });
      })
      .then(() => {
        httpServer.listen({ port }, () => {
          console.log(
            `🚀 Server ready at http://localhost:5000${server.graphqlPath}`
          );
          CharacterMap(database);
        });
      });
  };
}

export default Server;
