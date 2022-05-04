import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import http from 'http';
import morgan from 'morgan';
import database from './database';
import { CharacterMap } from './models/character.model';
import characterRouter from './routes/characters';
import uploadImagesRouter from './routes/uploadImages';
import StorageService from './services/storageService';

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const storage = new StorageService();
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
    this.app.use(cors(corsOptions));
    this.app.use(morgan('dev'));
    this.app.use(express.static('storage'));
  }

  private routerConfig() {
    this.app.use('/characters', characterRouter({ storage: storage.storage }));
    this.app.use('/uploads', uploadImagesRouter({ storage: storage.storage }));
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
