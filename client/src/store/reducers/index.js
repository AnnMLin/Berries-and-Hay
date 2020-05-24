import { combineReducers } from 'redux'
import user from './user'
import warning from './warning'
import transactions from './transactions'

const reducer = combineReducers({
  user,
  warning,
  transactions
})

export default reducer