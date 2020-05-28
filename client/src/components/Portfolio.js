import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions'
// import axios from 'axios'

const Portfolio = () => {
  const user = useSelector(state => state.user)
  const warning = useSelector(state => state.warning)
  const dispatch = useDispatch()
  const portfolio = useSelector(state => state.portfolio)
  const totalValue = useSelector(state => state.totalValue)

  const [state, setState] = useState({ticker : '', qty : 0})

  const handleChange = e => {
    setState({...state, [e.target.name] : e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    // VALIDATE ALL FIELDS
    if(!state.ticker) {
      // SHOW WARNING
      dispatch(actions.showWarning('Please enter ticker'))
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
    dispatch(actions.getTransactions())
  },[])

  useEffect(() => {
    setState({ticker : '', qty : 0})
  }, [user.balance])

  return (
    <div id='portfolio'>
      <div className='content-container'>
        <div className='title'>{`Portfolio ($${totalValue})`}</div>
        <div className='content'>
          <div className='list'>
            {Object.keys(portfolio).length ? 
            Object.keys(portfolio).map(name => {
              const quantity = portfolio[name].quantity
              const price = portfolio[name].price
              const value = portfolio[name].value
              const openPrice = portfolio[name].openPrice
              let color = ''
              if(price > openPrice) color = 'green'
              else if(price < openPrice) color = 'red'
              else color = 'grey'

              return (
                <div key={name} className={`list-item ${color}`}>
                  <div>{`${name} - ${quantity} Shares`}</div>
                  <div>{`$${value}`}</div>
                </div>
              )
            }) : 'BUY SOMETHING!'}
          </div>
          <div id='buy-shares'>
            <div id='balance'>{`Balance : $${user.balance}`}</div>
            <form id='buy-shares-form' className='form' onSubmit={handleSubmit}>
              <div className='form-item'>
                <div>
                  <div>Ticker:</div>
                  <input id='ticker' type='string' name='ticker' value={state.ticker} onChange={handleChange} />
                </div>
                <div>
                  <div>Quantity:</div>
                  <input id='qty' type='number' name='qty' value={state.qty} onChange={handleChange} />
                </div>
                <div className='btn-container'>
                  <div className='btn-item'>
                    <div className='btn' type='submit' onClick={handleSubmit}>Submit</div>
                  </div>
                  {warning ? 
                  <div className='warning'>{warning}</div>
                  : null
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio