import { createUser, GOT_USER, getUser, getMe, logout } from './user'
import { showWarning, clearWarning, SHOW_WARNING, CLEAR_WARNING } from './warning'
import { buyShare, UPDATED_BALANCE, updatedBalance } from './ticker'

const actions = {
  createUser,
  getUser,
  showWarning,
  clearWarning,
  getMe,
  logout,
  buyShare,
  updatedBalance
}

export const actionTypes = {
  GOT_USER,
  SHOW_WARNING,
  CLEAR_WARNING,
  UPDATED_BALANCE
}

export default actions