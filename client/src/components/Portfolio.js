import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Portfolio = () => {
  const user = useSelector(state => state.user)
  console.log('IN COMPONENT:', user)

  useEffect(() => {
    console.log('IN EFFECT:', user)
  })

  return (
    <div id='portfolio'>Portfolio</div>
  )
}

export default Portfolio