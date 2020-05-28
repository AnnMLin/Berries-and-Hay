import axios from 'axios'
import actions from '.'

// ACTION TYPES
export const GOT_USER = 'GOT_USER'

// ACTION CREATOR
export const gotUser = user => ({type: GOT_USER, user})

// THUNK CREATOR
export const getUser = ({email, password}) => dispatch => (
  axios.put('/auth/login', {email, password})
  .then(user => {
    // console.log('USER in THUNK:', user)
    dispatch(gotUser(user.data))
  })
  .catch(err => {
    console.log('Error logging in user:', err)
    if(err.response.status === 401){
      dispatch(actions.showWarning('Incorrect email or password'))
    }
  })
)

export const createUser = ({name, email, password}) => (dispatch, getState) => (
  // SEND CREATE USER REQUEST TO SERVER
  axios.post('/auth/createUser', {name, email, password})
    .then(user => {
      // LOAD USER TO STATE
      dispatch(gotUser(user.data))
    })
    .catch(err => {
      console.log('Error creating user:', err)
      // SEND WARNING TO CLIENT
      if(err.response.data.name === 'SequelizeUniqueConstraintError') {
        dispatch(actions.showWarning('Email already in use'))
      }
    })
)

export const getMe = () => dispatch => (
  axios.get('/auth/me')
    .then(user => {
      // console.log('ME:', user.data)
      dispatch(gotUser(user.data))
    })
    .catch(err => 
      console.log('Error getting user:', err)
    )
)

export const logout = () => dispatch => (
  axios.delete('/auth/logout')
    .then(() => {      
      dispatch(gotUser({})) 
      dispatch(actions.clearPortfolio())
      dispatch(actions.gotTotalValue(0))
    })
    .catch(err => {
      console.log('Error deleting user:', err)
    })
)