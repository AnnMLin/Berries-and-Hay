import { actionTypes } from '../actions'
const { GOT_USER } = actionTypes

// INITIAL STATE
const initialState = {}

// REDUCER
const reducer = (state = initialState, action) => {
  console.log(action.user)
  switch(action.type) {
    case GOT_USER:
      return {...action.user}
    default:
      return state
  }
}

export default reducer