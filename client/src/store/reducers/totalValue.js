import { actionTypes } from '../actions'
const { GOT_TOTAL_VALUE } = actionTypes

// INITIAL STATE
const initialState = 0

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_TOTAL_VALUE:
      return action.totalValue
    default:
      return state
  }
}

export default reducer