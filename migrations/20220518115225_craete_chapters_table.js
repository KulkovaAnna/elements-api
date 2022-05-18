/*
  public id!: number;
  public order!: number;
  public title: string;
  public content: string;
*/

exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('chapters', (table) => {
    table.increments('id');
    table.integer('order').notNullable();
    table.string('title', 255).nullable();
    table.text('content').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chapters');
};
