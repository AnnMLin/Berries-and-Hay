import axios from 'axios'
import actions from '.'
import history from '../../history'

// ACTION TYPES
export const GOT_USER = 'GOT_USER'

// ACTION CREATOR
export const gotUser = user => ({type: GOT_USER, user})

// THUNK CREATOR
export const createUser = ({name, email, password}) => dispatch => {
  // SEND CREATE USER REQUEST TO SERVER
  axios.post('/users/createUser', {name, email, password})
    .then(user => {
      dispatch(actions.clearWarning())
      // LOAD USER TO STATE
      dispatch(gotUser(user.data))
      // REDIRECT TO PORTFOLIO
      console.log('HISTORY:', history)
      history.push('/home/portfolio')
      // do those auth things
    })
    .catch(err => {
      // SEND WARNING TO CLIENT
      if(err.response.data.name === 'SequelizeUniqueConstraintError') {
        dispatch(actions.showWarning('Email already in use'))
      }
    })
}