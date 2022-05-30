import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

const isDevEnv = process.env.NODE_ENV === 'development';

export const port = isDevEnv ? 5000 : Number(process.env.API_PORT);
export const DB_HOST = isDevEnv ? 'localhost' : String(process.env.DB_HOST);
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_NAME = String(process.env.DB_NAME);
export const DB_USER = String(process.env.DB_USER);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
export const SRORAGE_PATH = isDevEnv
  ? 'storage'
  : String(process.env.STORAGE_PATH);
export const JWT_SECRET = String(process.env.JWT_SECRET);
