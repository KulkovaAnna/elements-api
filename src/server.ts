import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import http from 'http';
import database from './database';
import { CharacterMap } from './models/character.model';
import schema from './schemas/typeDefs';
import charactersResolver from './resolvers/characters';
import uploadImages from './routes/uploadImages';

import StorageService from './services/storageService';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const { storage } = new StorageService();
class Server {
  private app: Express = null;

  constructor() {
    this.app = express();
    this.app.use(express.static('storage'));
    this.app.use('/upload', uploadImages({ storage }));
  }

  public start = (port: number) => {
    const httpServer = http.createServer(this.app);
    const server = new ApolloServer({
      typeDefs: schema,
      resolvers: [charactersResolver({ storage })],
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
