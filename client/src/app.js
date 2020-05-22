import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom'
import { CreateAccount, SignIn, Transactions, Portfolio } from './components'

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(users => setUsers(users))
  }, [])
  return (
    <div id='app'>
      <div>
        {users.length ?
        users.map(user => (
          <div key={user.id}>
            <div>{user.id}</div>
            <div>{user.email}</div>
            <div>{user.password}</div>
          </div>
        )) :
        'Loading...'}
      </div>
      <Switch>
        <Route exact path='/' component={CreateAccount} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/transactions' component={Transactions} />
        <Route path='/portfolio' component={Portfolio} />
      </Switch>
    </div>
  )
}

export default App;
