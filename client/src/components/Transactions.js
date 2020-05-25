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
      <div className='content'>
        <div className='list'>
          {transactions.map(transaction => (
            <div key={transaction.id} className='list-item'>
              <div className='transaction-name'>{transaction.name}</div>
              <div className='transaction-qty'>{transaction.quantity}</div>
              <div className='transaction-price'>{transaction.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions