import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

const isDevEnv = process.env.NODE_ENV === 'development';

export const port = isDevEnv ? 5000 : Number(process.env.API_PORT);
export const db_host = isDevEnv ? 'localhost' : String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);
export const storage_path = isDevEnv
  ? 'storage'
  : String(process.env.STORAGE_PATH);
export const jwt_secret = String(process.env.JWT_SECRET);
