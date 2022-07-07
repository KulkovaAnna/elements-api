import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

export const PORT = Number(process.env.PORT);
export const HOST = String(process.env.HOST);
export const DB_HOST = String(process.env.DB_HOST);
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_NAME = String(process.env.DB_NAME);
export const DB_USER = String(process.env.DB_USER);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
export const DATABASE_URL = String(process.env.DATABASE_URL);
export const STORAGE_PATH = String(process.env.STORAGE_PATH);
export const JWT_SECRET = String(process.env.JWT_SECRET);
