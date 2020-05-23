import { createUser, GOT_USER } from './user'
import { showWarning, clearWarning, SHOW_WARNING, CLEAR_WARNING } from './warning'

const actions = {
  createUser,
  showWarning,
  clearWarning
}

export const actionTypes = {
  GOT_USER,
  SHOW_WARNING,
  CLEAR_WARNING
}

export default actions