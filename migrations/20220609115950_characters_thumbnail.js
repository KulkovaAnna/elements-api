exports.up = function (knex) {
  return knex.schema.alterTable('characters', (table) => {
    table.string('thumbnail_image', 255).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('characters', (table) => {
    table.dropColumn('thumbnail_image');
  });
};
