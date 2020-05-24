import { actionTypes } from '../actions'
const { GOT_TRANSACTIONS, ADD_TRANSACTION } = actionTypes 

// INITIAL STATE
const initialState = []

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_TRANSACTIONS:
      return [...action.transactions]
    case ADD_TRANSACTION:
      return [...state, action.transaction]
    default:
      return state
  }
} 

export default reducer