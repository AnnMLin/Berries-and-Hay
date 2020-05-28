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
export const getOpenPrice = (portfolio) => dispatch => (
  Promise.all(Object.keys(portfolio).map(symbol => (
    // GET OPEN PRICE
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/ohlc?token=${token}`)
      .then(res => res.data)
      .then(res => {
        if(res.open) {
          // console.log('OPEN PRICE:', symbol, res.open.price)
          portfolio[symbol].openPrice = res.open.price
        }
      })
      .catch(err => {
        console.log('Error occurs at', symbol, 'Err:', err)
      })
  )))
    .then(() => (
      dispatch(gotPortfolio(portfolio))
    ))
    .then(() => {
      // console.log('SECOND STEP DONE!!!')
    })
    .catch(err => {
      console.log('Error at gotPortfolio:', err)
    })
)

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
        // console.log('GOT PRICE:', symbol)
        // ONLY ADD PRICE & VALUE TO SYMBOL IF NOT UNDEFINED, IF UNDEFINED, USE LAST PRICE/VALUE (IF ANY)
        if (price) {
          const value = price * portfolio[symbol].quantity
          portfolio[symbol].price = Number(price.toFixed(2))
          portfolio[symbol].value = Number(value.toFixed(2))
          totalValue += value
        }
        // console.log('TOTALVALUE:', totalValue)
      })
      .catch(err => {
        console.log('Error occurs at', symbol, 'Err:', err)
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
    .then(() => {
      // console.log('FIRST STEP DONE!!!')
    })
    .catch(err => {
      console.log('Error at makePortfolio:', err)
    })

  // // THIS ONE GETS 429 CODE (TOO MANY API CALLS AT ONCE) FROM IEX
  // Promise.all(Object.keys(portfolio).map(symbol => (
  //   // GET SHARE CURRENT PRICE
  //   axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
  //     .then(res => res.data)
  //     .then(price => {
  //       const value = price * portfolio[symbol].quantity
  //       portfolio[symbol].price = Number(price.toFixed(2))
  //       portfolio[symbol].value = Number(value.toFixed(2))
  //       totalValue += value
  //       console.log('TOTALVALUE:', totalValue)
  //     })
  //     .then(() => (
  //       // GET OPEN PRICE
  //       axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/ohlc?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
  //     ))
  //     .then(res => {
  //       if(res.data.open) {
  //         console.log('OPEN PRICE:', res.data)
  //         portfolio[symbol].openPrice = res.data.open.price
  //       }
  //     })
  //     .catch(err => {
  //       console.log('Error occurs at', symbol, 'Err:', err)
  //     })
  // )))
  // .then(() => {
  //   dispatch(gotPortfolio(portfolio))
  //   dispatch(gotTotalValue(Number(totalValue.toFixed(2))))
  // })


  // // THIS ONE WORKS BUT COMPONENT RENDERS BEFORE SECOND API CALL IS SAVED TO STATE
  // Promise.all(Object.keys(portfolio).map(symbol => (
  //   // GET SHARE CURRENT PRICE
  //   axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
  //     .then(res => res.data)
  //     .then(price => {
  //       const value = price * portfolio[symbol].quantity
  //       portfolio[symbol].price = Number(price.toFixed(2))
  //       portfolio[symbol].value = Number(value.toFixed(2))
  //       totalValue += value
  //       console.log('TOTALVALUE:', totalValue)
  //     })
  //     .then(() => {
  //       // GET OPEN PRICE
  //       axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/ohlc?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
  //         .then(res => {
  //           if(res.data.open) {
  //             console.log('OPEN PRICE:', res.data)
  //             portfolio[symbol].openPrice = res.data.open.price
  //           }
  //         })
  //     })
  // )))
  // .then(() => {
  //   dispatch(gotPortfolio(portfolio))
  //   dispatch(gotTotalValue(Number(totalValue.toFixed(2))))
  // })
}