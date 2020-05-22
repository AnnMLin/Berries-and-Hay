import { combineReducers } from 'redux'
import user from './user'
import warning from './warning'

const reducer = combineReducers({
  user,
  warning
})

export default reducer