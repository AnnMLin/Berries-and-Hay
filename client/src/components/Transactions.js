import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions'

const Transactions = () => {

  const transactions = useSelector(state => state.transactions)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getTransactions())
  }, [])

  return (
    <div id='transactions'>
      <div className='content-container'>
        <div className='title'>Transactions</div>
        <div className='content'>
          <div className='list'>
            {transactions.map(transaction => {
              const name = transaction.name
              const quantity = transaction.quantity
              const price = transaction.price
              return (
                <div key={transaction.id} className='list-item'>
                  <div>BUY</div>
                  <div>{`${name} - ${quantity} Shares`}</div>
                  <div>{`@ ${price}`}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transactions