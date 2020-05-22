import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../store/actions'

const SignUpForm = () => {

  const [state, setState] = useState({name: '', email: '', password: ''})
  const warning = useSelector(state => state.warning)
  
  const dispatch = useDispatch()

  const handleChange = e => {
    setState({...state, [e.target.name] : e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()

    // VALIDATE ALL FIELDS
    if(!state.name || !state.email || !state.password) {
      // SHOW WARNING
      dispatch(actions.showWarning('All fields required *'))
      return
    }
    if(!validateEmail(state.email)) {
      // SHOW WARNING
      dispatch(actions.showWarning('Please enter a valid email *'))
      return
    }

    // DISPATCH CREATE USER
    dispatch(actions.createUser(state))
  }

  const validateEmail = email => {
    // eslint-disable-next-line
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    // sourced from: https://flaviocopes.com/how-to-validate-email-address-javascript/
    return expression.test(String(email).toLowerCase())
  }


  return (
    <form id='sign-up-form' className='form' onSubmit={handleSubmit}>
      <div id='sign-up-name'>
        <div>Name:</div>
        <input type='text' name='name' value={state.name} onChange={handleChange}/>
      </div>
      <div id='sign-up-email'>
        <div>Email:</div>
        <input type='text' name='email' value={state.email} onChange={handleChange}/>
      </div>
      <div id='sign-up-password'>
        <div>Password:</div>
        <input type='text' name='password' value={state.password} onChange={handleChange}/>
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
    </form>
  )
}

export default SignUpForm