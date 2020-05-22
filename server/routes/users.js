const express = require('express');
const router = express.Router();
const { User } = require('../db/models')

// POST new user to db
router.post('/createUser', (req, res) => {
  // CREATE USER
  User.create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(err => {
      console.log('Error creating user', err)
      if(err.name === 'SequelizeUniqueConstraintError') {
        console.log('Email already registered!')
        res.status(401).send(err)
      }
    })
})

// GET user
router.get('/', function(req, res, next) {
  res.json([
    {id: 1, email: 'user1@gmail.com', password: '1111'},
    {id: 2, email: 'user2@gmail.com', password: '2222'}
  ])
});

module.exports = router;
