import { createUser, GOT_USER, getUser, getMe, logout } from './user'
import { showWarning, clearWarning, SHOW_WARNING, CLEAR_WARNING } from './warning'

const actions = {
  createUser,
  getUser,
  showWarning,
  clearWarning,
  getMe,
  logout
}

export const actionTypes = {
  GOT_USER,
  SHOW_WARNING,
  CLEAR_WARNING
}

export default actions