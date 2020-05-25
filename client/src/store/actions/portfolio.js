import axios from 'axios'

// ACTION TYPES
export const GOT_PORTFOLIO = 'GOT_PORTFOLIO'

// ACTION CREATOR
export const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})

// THUNK CREATOR
export const makePortfolio = () => (dispatch, getState) => {
  debugger
  const state = getState()
  const transactions = state.transactions

  const portfolio = {}

  transactions.forEach(transaction => {
    if(!portfolio[transaction.name]) {
      portfolio[transaction.name] = {}
      portfolio[transaction.name].quantity = Number([transaction.quantity])
    } else {
      portfolio[transaction.name].quantity += Number([transaction.quantity])
    }
  })

  Promise.all(Object.keys(portfolio).map(symbol => (
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
      .then(res => res.data)
      .then(price => {
        portfolio[symbol].value = price * portfolio[symbol].quantity
      })
  ))).then(() => {
    dispatch(gotPortfolio(portfolio))
  })
}