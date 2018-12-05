exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', table => {
      table.increments();
      table.string('task').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tasks');
};
