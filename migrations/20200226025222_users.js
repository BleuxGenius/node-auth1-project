// create the first migration with knex migrate:make [migration-name]


exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();

      tbl.string('username', 128)
      .notNullable()
      .unique();
        tbl.string('password', 128).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
