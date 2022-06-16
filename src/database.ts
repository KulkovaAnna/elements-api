// import { Sequelize } from 'sequelize';
import { DATABASE_URL } from '../config';
import createClient from 'knex';

const knex = createClient({
  client: 'pg',
  connection: DATABASE_URL,
  migrations: {
    tableName: 'migrations',
  },
});

export default knex;
