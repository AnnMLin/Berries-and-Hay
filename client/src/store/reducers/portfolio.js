import { actionTypes } from '../actions'
const { GOT_PORTFOLIO } = actionTypes

// INITIAL STATE
const initialState = {}

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GOT_PORTFOLIO:
      return action.portfolio
    default:
      return state
  }
}

export default reducer