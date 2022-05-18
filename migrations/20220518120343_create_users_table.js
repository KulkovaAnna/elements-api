/**
  public id!: number;
  public email!: string;
  public password!: string;
  public isAdmin!: boolean;
 */
exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id');
    table.string('email').notNullable().unique();
    table.string('password', 255).notNullable();
    table.boolean('isAdmin').notNullable().default(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
