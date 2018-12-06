exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, task: 'Get groceries'},
        {id: 2, task: 'Do laundry'},
        {id: 3, task: 'Curse mankind'}
      ])
      .then(function() {
      return knex.raw(`SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks))`)
      })

    });
}
