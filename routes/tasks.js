var express = require('express');
var router = express.Router();
const knex = require('../knex')

/* GET users listing. */
router.get('/', (req, res, next) => {
  knex('tasks').then(result => {
    res.send(result);
  })
});

const checkId = (req, res, next) => {
  knex('tasks').where('id', req.params.id).then(result => {
    if (result.length === 0) {
      res.status(404).send({
        error: {
          message: 'The specified task could not be found!'
        }
      })
    } else {
      next();
    }
  })
}

router.get('/:id', checkId, (req, res, next) => {
  knex('tasks').where('id', req.params.id).then(result => {
    res.send(result[0]);
  })
})

router.post('/', (req, res, next) => {
  const newTask = {
    task: req.body.task
  }
  knex('tasks')
    .returning('*')
    .insert(newTask)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).send({
        error: {
          message: 'Something broke.'
        }
      })
    })
})

router.delete('/:id', checkId, (req, res, next) => {
  knex('tasks')
    .where('id', req.params.id)
    .del()
    .then(() => {
      knex('tasks').then(result => {
        res.send(result)
      })
    })
    .catch(err => {
      res.status(400).send({
        error: {
          message: 'Something broke.'
        }
      })
    })
})

module.exports = router;
