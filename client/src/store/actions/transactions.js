import axios from 'axios'
import actions from '.'
import { teal } from 'color-name';

// ACTION TYPES
export const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'

// ACTION CREATOR
export const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
export const addTransaction = transaction => ({type: ADD_TRANSACTION, transaction})

// THUNK CREATOR
export const getTransactions = () => (dispatch, getState) => {
  const state = getState()
  const userId = state.user.id
  return axios.get(`/user/${userId}/transactions`)
    .then(transactions => {
      console.log('TRANSACTIONS:', transactions.data)
      console.log('PORTFOLIO:', state.portfolio)
      dispatch(gotTransactions(transactions.data))
      dispatch(actions.makePortfolio(transactions.data))
    })
    .catch(err => {
      console.log('Error getting transactions:', err)
    })
}

export const createTransaction = transaction => (dispatch, getState) => {
  const state = getState()
  const userId = state.user.id
  return axios.post(`/user/${userId}/create-transaction`, transaction)
    .then(transaction => {
      dispatch(addTransaction(transaction.data))
      const state = getState()
      const transactions = state.transactions
      dispatch(actions.makePortfolio(transactions))
    })
    .catch(err => {
      console.log('Error creating transaction:', err)
    })
}