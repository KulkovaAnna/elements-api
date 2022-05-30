exports.up = async function up(knex) {
  return knex.schema.createTableIfNotExists('characters', (table) => {
    table.increments('id');
    table.string('name', 255).nullable();
    table.text('description').nullable();
    table.text('story').nullable();
    table.string('hero_image').nullable();
    table.string('full_name').nullable();
    table
      .enu('race', ['elf', 'human', 'goblin', 'siren', 'werevolf'], {
        useNative: true,
        existingType: false,
        enumName: 'race_enum',
      })
      .nullable();
    table
      .enu('sex', ['male', 'female', 'other'], {
        useNative: true,
        existingType: false,
        enumName: 'sex_enum',
      })
      .nullable();
    table.integer('birth_date').nullable();
    table.integer('death_date').nullable();
  });
};

exports.down = async function down(knex) {
  return knex.schema
    .dropTable('characters')
    .raw(`drop type sex_enum`)
    .raw(`drop type race_enum`);
};
