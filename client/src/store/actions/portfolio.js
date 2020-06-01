import axios from 'axios'
import token from '../../iexPublishableToken'

// ACTION TYPES
export const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
export const GOT_TOTAL_VALUE = 'GOT_TOTAL_VALUE'
export const CLEAR_PORTFOLIO = 'CLEAR_PORTFOLIO'

// ACTION CREATOR
export const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
export const gotTotalValue = totalValue => ({type: GOT_TOTAL_VALUE, totalValue})
export const clearPortfolio = () => ({type: CLEAR_PORTFOLIO})

// THUNK CREATOR
export const getOpenPrice = (portfolio) => (dispatch, getState) => {
  const state = getState()
  return Promise.all(Object.keys(portfolio).map(symbol => (
    // GET OPEN PRICE
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/ohlc?token=${token}`)
      .then(res => res.data)
      .then(res => {
        if(res.open) portfolio[symbol].openPrice = res.open.price
        // IF OPEN PRICE DIDN'T RETURN, USE LAST OPEN PRICE ON FILE (IF ANY)
        else if(state.portfolio[symbol] && state.portfolio[symbol].openPrice) portfolio[symbol].openPrice = state.portfolio[symbol].openPrice
      })
      .catch(err => {
        console.log('Error occurs at', symbol, 'Err:', err)
      })
  )))
    .then(() => (
      dispatch(gotPortfolio(portfolio))
    ))
    .catch(err => {
      console.log('Error at gotPortfolio:', err)
    })
  }

export const makePortfolio = () => (dispatch, getState) => {

  const state = getState()
  const transactions = state.transactions

  // CONSTRUCTING PORTFOLIO BASE ON TRANSACTIONS, PORTFOLIO THEN WILL HAVE SYMBOL AS KEYS AND QUANTITY AS NESTED KEY
  // PORTFOLIO : {
  //   SYMBOL : {
  //     QUANTITY : X
  //   } 
  // }
  const portfolio = {}

  transactions.forEach(transaction => {
    if(!portfolio[transaction.name]) {
      portfolio[transaction.name] = {}
      portfolio[transaction.name].quantity = Number([transaction.quantity])
    } else {
      portfolio[transaction.name].quantity += Number([transaction.quantity])
    }
  })

  // MAPPING THROUGH ALL SYMBOL KEYS TO DO API CALLS AND GET CURRENT PRICE
  // SAME TIME, ADD CURRENT VALUE TO TOTAL VALUE
  // AFTER THIS, EACH SYMBOL KEY WILL HAVE TWO MORE KEY/VALUE PAIRS ON 'PRICE' AND 'VALUE', VALUE IS FOR DISPLAY, PRICE IS FOR COMPARING WITH OPENPRICE
  // PORTFOLIO : {
  //   SYMBOL : {
  //     QUANTITY : X,
  //     PRICE : Y,
  //     VALUE : XY
  //   }
  // }

  let totalValue = 0

  return Promise.all(Object.keys(portfolio).map(symbol => (
    // GET SHARE CURRENT PRICE
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${token}`)
      .then(res => res.data)
      .then(price => {
        // ONLY ADD PRICE & VALUE TO SYMBOL IF NOT UNDEFINED, IF UNDEFINED, USE LAST PRICE/VALUE (IF ANY)
        const value = price * portfolio[symbol].quantity
        portfolio[symbol].price = Number(price.toFixed(2))
        portfolio[symbol].value = Number(value.toFixed(2))
        totalValue += value
      })
      .catch(err => {
        console.log('Error occurs at', symbol, 'Err:', err)
        // IF PRICE COMES BACK UNDEFINED, USE THE VALUE THAT'S ALREADY ON FILE FOR TOTAL VALUE
        if(state.portfolio[symbol]){
          totalValue += state.portfolio[symbol].value
        }
      })
  )))
    .then(() => (
      // DISPATCH TOTAL VALUE TO STATE
      dispatch(gotTotalValue(Number(totalValue.toFixed(2))))     
    ))
    .then(() => (
      // PASS PORTFOLIO TO NEXT THUNK (TO ADD OPEN PRICE)
      dispatch(getOpenPrice(portfolio))
    ))
    .catch(err => {
      console.log('Error at makePortfolio:', err)
    })
}