import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions'

const Portfolio = () => {
  const user = useSelector(state => state.user)
  const warning = useSelector(state => state.warning)
  const dispatch = useDispatch()

  const [state, setState] = useState({ticker : '', qty : 0})

  const handleChange = e => {
    setState({...state, [e.target.name] : e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    // VALIDATE ALL FIELDS
    if(!state.ticker) {
      // SHOW WARNING
      dispatch(actions.showWarning('Please enter a stock symbol'))
      return
    }
    if(!state.qty || state.qty <= 0) {
      // SHOW WARNING
      dispatch(actions.showWarning('Please enter a valid quantity'))
      return
    }

    dispatch(actions.clearWarning())

    // DISPATCH GET SHARE
    dispatch(actions.buyShare(state.ticker.toUpperCase(), state.qty))
  }

  useEffect(() => {
    setState({ticker : '', qty : 0})
  }, [user.balance])

  return (
    <div id='portfolio'>
      <div className='title'>Portfolio</div>
      <div className='content'>
        <div className='list'>
        </div>
        <div id='buy-shares'>
          <div id='balance'>{`Balance : $${user.balance}`}</div>
          <form id='buy-shares-form' className='form' onSubmit={handleSubmit}>
            <input id='ticker' type='string' name='ticker' value={state.ticker} onChange={handleChange} />
            <input id='qty' type='number' name='qty' value={state.qty} onChange={handleChange} />
            <div className='btn-container'>
              <div className='btn-item'>
                <div className='btn' type='submit' onClick={handleSubmit}>Submit</div>
              </div>
              {warning ? 
              <div className='warning'>{warning}</div>
              : null
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Portfolio