import { createUser, GOT_USER, gotUser, getUser, getMe, logout } from './user'
import { showWarning, clearWarning, SHOW_WARNING, CLEAR_WARNING } from './warning'
import { buyShare, UPDATED_BALANCE, updatedBalance } from './ticker'
import { GOT_TRANSACTIONS, ADD_TRANSACTION, gotTransactions, addTransaction, getTransactions, createTransaction } from './transactions'
import { makePortfolio, GOT_PORTFOLIO, gotPortfolio } from './portfolio'

const actions = {
  createUser,
  getUser,
  gotUser,
  showWarning,
  clearWarning,
  getMe,
  logout,
  buyShare,
  updatedBalance,
  gotTransactions, 
  addTransaction, 
  getTransactions, 
  createTransaction,
  makePortfolio,
  gotPortfolio
}

export const actionTypes = {
  GOT_USER,
  SHOW_WARNING,
  CLEAR_WARNING,
  UPDATED_BALANCE,
  GOT_TRANSACTIONS, 
  ADD_TRANSACTION,
  GOT_PORTFOLIO
}

export default actions