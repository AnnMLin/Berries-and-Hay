const express = require('express');
const router = express.Router();
const { User } = require('../db/models')

// Sign up new user
router.post('/createUser', (req, res) => {
  // CREATE USER
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      req.session.userId = user.id
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

// Log user in
router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if(!user) {
        console.log('Email not found')
        const err = new Error('Email not found')
        err.status = 401
        next(err)
      } else if(!user.correctPassword(req.body.password)) {
        console.log('Incorrrect password')
        const err = new Error('Incorrrect password')
        err.status = 401
        next(err)
      } else {
        req.session.userId = user.id
        console.log('IS USER IN SESSION??????', req.session)
        res.status(200).send(user)
      }
    })
    .catch(next)
})

// user stays in after refresh
router.get('/me', (req, res, next) => {
  if(!req.session.userId){
    userNotFound(next)
  } else {
    User.findByPk(req.session.userId)
      .then(user => user ? res.json(user) : userNotFound(next))
      .catch(next)
  }
})

const userNotFound = next => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

router.delete('/logout', (req, res) => {
  req.session.destroy()
  res.status(204).end()
})

module.exports = router