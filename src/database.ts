// import { Sequelize } from 'sequelize';
import { db_host, db_name, db_password, db_port, db_user } from '../config';
import createClient from 'knex';

const knex = createClient({
  client: 'pg',
  connection: {
    host: db_host,
    port: db_port,
    user: db_user,
    password: db_password,
    database: db_name,
  },
  migrations: {
    tableName: 'migrations',
  },
});

export default knex;
