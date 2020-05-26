import React from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../store/actions'

const Navbar = () => {
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  const handleClick = () => {
    dispatch(actions.logout())
      .then(() => {
        history.push('/')
      })
  }

  return(
    <div id='navbar'>
      <div id='navbar-content'>
        <div id='hello'>{`Hello ${user.name}!`}</div>
        <div id='options'>
          <div id='navs'>
            <Link to={`${match.url}`}>Portfolio</Link>
            <div>|</div>
            <Link to={`${match.url}/transactions`}>Transactions</Link>
          </div>
          <div className='btn-container'>
            <div className='btn-item'>
              <div className='btn' onClick={handleClick}>Log out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar