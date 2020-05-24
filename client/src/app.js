import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'
import { CreateUser, LogIn, Home } from './components'
import actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(actions.getMe())
  }, [])

  useEffect(() => {
    if(user.id) {
      history.push('/home')
    }
  }, [user])

  return (
    <div id='app'>
      <Switch>
        <Route exact path='/' component={LogIn} />
        <Route path='/create-user' component={CreateUser} />
        {user.id &&
          <Route path='/Home' component={Home} /> 
        }
        <Route path='/*' component={LogIn} />
      </Switch>
    </div>
  )
}

export default App;
