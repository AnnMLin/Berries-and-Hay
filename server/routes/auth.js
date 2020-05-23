const express = require('express');
const router = express.Router();
const { User } = require('../db/models')

// POST new user to db
router.post('/createUser', (req, res) => {
  // CREATE USER
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
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

router.get('/me', (req, res) => {

})

router.delete('/logout', (req, res) => {

})

module.exports = router