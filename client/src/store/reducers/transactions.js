import { actionTypes } from '../actions'
const { GOT_TRANSACTIONS } = actionTypes 

// INITIAL STATE
const initialState = []

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_TRANSACTIONS:
      return {...action.transactions}
    default:
      return state
  }
} 

export default reducer