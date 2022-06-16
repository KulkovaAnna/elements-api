import { PORT } from './config';
import server from './src/server';

const starter = new server().start(PORT);

export default starter;
