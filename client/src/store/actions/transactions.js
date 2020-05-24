import axios from 'axios'
import actions from '.'

// ACTION TYPES
export const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS'

// ACTION CREATOR
export const gotTransactions = transactions => ({type: GOT_TRANSACTIONS, transactions})

// THUNK CREATOR
export const getTransactions = () => (dispatch, getState) => {
  const userId = getState().user.id
  return axios.get()
}