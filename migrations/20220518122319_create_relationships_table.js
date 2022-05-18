/**
  public id!: number;
  public char_id!: number;
  public related_char_id!: number;
  public related_as!: string;
 */
exports.up = function (knex) {
  return knex.schema.createTable('relationships', (table) => {
    table.increments('id');
    table.integer('char_id').notNullable();
    table.integer('relative_id').notNullable();
    table.enu(
      'related_as',
      [
        'sister',
        'brother',
        'mother',
        'father',
        'wife',
        'husband',
        'son',
        'daughter',
        'grandmother',
        'grandfather',
        'grandson',
        'granddaughter',
        'uncle',
        'aunt',
        'nephew',
        'niece',
        'stepmother',
        'stepfather',
        'stepson',
        'stepdaughter',
      ],
      {
        useNative: true,
        existingType: false,
        enumName: 'rel_enum',
      }
    );
    table.foreign('char_id').references('characters.id');
    table.foreign('relative_id').references('characters.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('relationships').raw(`drop type rel_enum`);
};
