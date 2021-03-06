const express = require('express');
const router = express.Router();
const { User, Transaction } = require('../db/models')

// UPDATE USER BALANCE
router.put('/:id/updateBalance/:balance', (req, res, next) => {
  const balance = Number(req.params.balance)
  User.update({ balance }, {
    where: {
      id : req.params.id
    },
    returning: true,
    plain: true
  })
    .then(user => {
      res.status(200).send(user[1].dataValues.balance)
    })
    .catch(err => {
      console.log('Error updating user balance:', err)
      next(err)
    })
})

// CREATE TRANSACTION
router.post('/:id/create-transaction', (req, res, next) => {
  Transaction.create({
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price
  })
    .then(transaction => {
      transaction.setUser(req.params.id)
      res.status(201).send(transaction)
    })
    .catch(err => {
      console.log('Error creating transaction:', err)
      next(err)
    })
})

// GET all user transactions
router.get('/:id/transactions', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => {
      user.getTransactions()
        .then(transactions => {
          res.status(200).send(transactions)
        })
        .catch(err => {
          console.log('Problem getting transactions by user:', err)
          next(err)
        })
    })
    .catch(err => {
      console.log('Problem gettin user:', err)
      next(err)
    })
})

module.exports = router;
