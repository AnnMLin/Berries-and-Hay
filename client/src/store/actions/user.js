import axios from 'axios'
import actions from '.'

// ACTION TYPES
const GOT_USER = 'GOT_USER'

// ACTION CREATOR
export const gotUser = user => ({type: GOT_USER, user})

// THUNK CREATOR
export const createUser = ({name, email, password}) => dispatch => {
  // SEND CREATE USER REQUEST TO SERVER
  axios.post('/users/createUser', {name, email, password})
    .then(user => {
      dispatch(actions.clearWarning())
      // load user data to state
      // redirect to homepage
      // do those auth things
      console.log(user.data)
    })
    .catch(err => {
      // SEND WARNING TO CLIENT
      if(err.response.data.name === 'SequelizeUniqueConstraintError') {
        dispatch(actions.showWarning('Email already in use'))
      }
    })
}