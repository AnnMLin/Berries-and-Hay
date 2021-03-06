import { actionTypes } from '../actions'
const { GOT_USER, UPDATED_BALANCE } = actionTypes

// INITIAL STATE
const initialState = {}

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_USER:
      return {...action.user}
    case UPDATED_BALANCE:
      return {...state, balance : action.balance}
    default:
      return state
  }
}

export default reducer