import axios from 'axios'
// import actions from '.'

// ACTION TYPES
export const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'
export const ADD_TRANSACTION = 'ADD_TRANSACTION'

// ACTION CREATOR
export const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})
export const addTransaction = transaction => ({type: ADD_TRANSACTION, transaction})

// THUNK CREATOR
export const getTransactions = () => (dispatch, getState) => {
  const userId = getState().user.id
  return axios.get(`/user/${userId}/transactions`)
    .then(transactions => {
      dispatch(gotTransactions(transactions))
    })
    .catch(err => {
      console.log('Error getting transactions:', err)
    })
}

export const createTransaction = transaction => (dispatch, getState) => {
  const userId = getState().user.id
  return axios.post(`/user/${userId}/create-transaction`, transaction)
    .then(transaction => {
      dispatch(addTransaction(transaction))
    })
    .catch(err => {
      console.log('Error creating transaction:', err)
    })
}