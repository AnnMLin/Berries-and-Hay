import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Navbar = () => {
  const match = useRouteMatch()
  return(
    <div id='navbar'>
      <Link to={`${match.url}/portfolio`}>Portfolio</Link>
      <Link to={`${match.url}/transactions`}>Transactions</Link>
    </div>
  )
}

export default Navbar