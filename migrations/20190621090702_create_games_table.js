exports.up = function(knex, Promise) {
  knex.schema.createTable('games', function(table) {
    table.increments();
    table.string('title').notNullable();
    table.string('genre').notNullable();
    table.string('releaseYear');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('games')
};
