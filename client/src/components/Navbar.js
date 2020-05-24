import React from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../store/actions'

const Navbar = () => {
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleClick = () => {
    dispatch(actions.logout())
      .then(() => {
        history.push('/')
      })
  }

  return(
    <div id='navbar'>
      <Link to={`${match.url}`}>Portfolio</Link>
      <Link to={`${match.url}/transactions`}>Transactions</Link>
      <div className='btn-container'>
        <div className='btn-item'>
          <div className='btn' onClick={handleClick}>Log out</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar