exports.up = function (knex) {
  return knex.schema.alterTable('characters', (table) => {
    table.enu('role', ['protagonist', 'main', 'minor'], {
      useNative: true,
      existingType: false,
      enumName: 'char_role_enum',
    });
  });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable('characters', (table) => {
      table.dropColumn('role');
    })
    .raw(`drop type char_role_enum`);
};
