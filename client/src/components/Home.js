import React from 'react'
import { Portfolio, Transactions, Navbar } from '.'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const Home = () => {
  const match = useRouteMatch()
  return (
    <div id='home'>
      <Navbar/>
      <Switch>
        <Route path={`${match.url}/portfolio`} component={Portfolio} />
        <Route path={`${match.url}/transactions`} component={Transactions} /> 
      </Switch>
    </div>
  )
}

export default Home