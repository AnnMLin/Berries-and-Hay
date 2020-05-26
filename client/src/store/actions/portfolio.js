import axios from 'axios'

// ACTION TYPES
export const GOT_PORTFOLIO = 'GOT_PORTFOLIO'
export const GOT_TOTAL_VALUE = 'GOT_TOTAL_VALUE'

// ACTION CREATOR
export const gotPortfolio = portfolio => ({type: GOT_PORTFOLIO, portfolio})
export const gotTotalValue = totalValue => ({type: GOT_TOTAL_VALUE, totalValue})

// THUNK CREATOR
export const getOpenPrice = (portfolio) => dispatch => (
  Promise.all(Object.keys(portfolio).map(symbol => (
    // GET OPEN PRICE
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/ohlc?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
      .then(res => res.data)
      .then(res => {
        if(res.open) {
          console.log('OPEN PRICE:', symbol, res.open.price)
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
      console.log('SECOND STEP DONE!!!')
    })
    .catch(err => {
      console.log('Error at gotPortfolio:', err)
    })
)

export const makePortfolio = () => (dispatch, getState) => {

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

  let totalValue = 0

  return Promise.all(Object.keys(portfolio).map(symbol => (
    // GET SHARE CURRENT PRICE
    axios.get(`https://sandbox.iexapis.com/stable/stock/${symbol}/price?token=${process.env.REACT_APP_IEX_SANDBOX_TOKEN}`)
      .then(res => res.data)
      .then(price => {
        console.log('GOT PRICE:', symbol)
        const value = price * portfolio[symbol].quantity
        portfolio[symbol].price = Number(price.toFixed(2))
        portfolio[symbol].value = Number(value.toFixed(2))
        totalValue += value
        console.log('TOTALVALUE:', totalValue)
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
      console.log('FIRST STEP DONE!!!')
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