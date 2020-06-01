import React from 'react'
import { Portfolio, Transactions, Navbar } from '.'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const Home = () => {
  const match = useRouteMatch()
  
  return (
    <div id='home'>
      <Navbar/>
      <Switch>
        <Route path={`${match.url}/transactions`} component={Transactions} />
        <Route path={`${match.url}`} component={Portfolio} />
      </Switch>
    </div>
  )
}

export default Home