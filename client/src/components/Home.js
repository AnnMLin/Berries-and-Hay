import React, { useEffect } from 'react'
import { Portfolio, Transactions, Navbar } from '.'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions'

const Home = () => {
  const state = useSelector(state => state)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  console.log('CURRENT STATE:', state)

  // useEffect(() => {
  //   dispatch(actions.getTransactions())
  // })

  const match = useRouteMatch()
  return (
    <div id='home'>
      <div>{user.email}</div>
      <Navbar/>
      <Switch>
        <Route path={`${match.url}/transactions`} component={Transactions} />
        <Route path={`${match.url}`} component={Portfolio} />
      </Switch>
    </div>
  )
}

export default Home