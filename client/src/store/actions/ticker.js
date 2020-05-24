import axios from 'axios'
import actions from '.'

// ACTION TYPES
export const UPDATED_BALANCE = 'UPDATED_BALANCE'

// ACTION CREATOR
export const updatedBalance = balance => ({type: UPDATED_BALANCE, balance})

// THUNK CREATOR
export const buyShare = (symbol, qty) => (dispatch, getState) => (
  // GET TICKER
  axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
    .then(res => res.data)
    .then(price => {
      const cost = price * qty
      // check if balance > cost
      const state = getState()
      const balance = state.user.balance
      // if true => GOT BALANCE
      if(balance >= cost) {
        const id = state.user.id
        dispatch(updateBalance(balance-cost, id))
      }
      // if false => sent warning
      else {
        dispatch(actions.showWarning('Not enough balance'))
      }

    })
    .catch(err => {
      console.log('Error buying share:', err)

    })
)

export const updateBalance = (balance, id) => (dispatch, getState) => {
  axios.put(`/user/${id}/updateBalance/${balance}`)
    .then(() => {
      dispatch(updatedBalance(balance))
    })
    .then(() => {
      const state = getState()
      console.log(state.user.balance)
    })
    .catch(err => {
      console.log('Error updating use balance:', err)
    })
  }