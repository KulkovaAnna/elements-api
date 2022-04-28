import server from './src/server';
import { port } from './config';

const starter = new server().start(port);

export default starter;
