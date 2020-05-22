// INITIAL STATE
const initialState = ''

// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW_WARNING':
     return action.msg
    case 'CLEAR_WARNING':
      return ''
    default:
      return state
  }
}

export default reducer