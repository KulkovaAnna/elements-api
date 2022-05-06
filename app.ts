import { port } from './config';
import server from './src/server';

const starter = new server().start(port);

export default starter;
