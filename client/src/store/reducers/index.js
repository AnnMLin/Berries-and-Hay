import { combineReducers } from 'redux'
import user from './user'
import warning from './warning'
import transactions from './transactions'
import portfolio from './portfolio'
import totalValue from './totalValue'

const reducer = combineReducers({
  user,
  warning,
  transactions,
  portfolio,
  totalValue
})

export default reducer