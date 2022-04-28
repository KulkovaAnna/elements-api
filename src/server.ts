import express, { Express } from 'express';
import bodyParser from 'body-parser';
import characterRouter from './routes/characters';
import http from 'http';
import { CharacterMap } from './models/character.model';
import database from './database';

class Server {
  private app: Express = null;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
  }

  private routerConfig() {
    this.app.use('/characters', characterRouter);
  }

  public start = (port: number) => {
    const server = http.createServer(this.app);
    server.listen(port, () => {
      console.log(`API started at http://localhost:${port}`);
      CharacterMap(database);
    });
  };
}

export default Server;
