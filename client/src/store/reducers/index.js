import { combineReducers } from 'redux'
import user from './user'
import warning from './warning'
import transactions from './transactions'
import portfolio from './portfolio'

const reducer = combineReducers({
  user,
  warning,
  transactions,
  portfolio
})

export default reducer