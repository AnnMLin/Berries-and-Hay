import { actionTypes } from '../actions'
const { GOT_PORTFOLIO, CLEAR_PORTFOLIO } = actionTypes

// INITIAL STATE
const initialState = {}

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_PORTFOLIO:
      const nextState = {...state}
      const portfolio = action.portfolio
      // RETURN INITIALSTATE, ITERATE THROUGH NESTED OBJ AND REPLACE AVAILABLE KEY/VALUE PAIRS
      Object.keys(portfolio).forEach(symbol => {
        if(!nextState[symbol]) nextState[symbol] = portfolio[symbol]
        else {
          if(portfolio[symbol].price) nextState[symbol].price = portfolio[symbol].price
          if(portfolio[symbol].value) nextState[symbol].value = portfolio[symbol].value
          if(portfolio[symbol].openPrice) nextState[symbol].openPrice = portfolio[symbol].openPrice
        }      
      })
      return nextState
    case CLEAR_PORTFOLIO:
      return {}
    default:
      return state
  }
}

export default reducer