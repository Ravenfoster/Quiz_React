import React from 'react'
import './Button.css'

const Button = props => {
const cls = [
  'Button'
]
  return (
    <button onClick ={props.onClick} className={cls.join(' ')} disabled={props.disabled}>
      {props.children}
    </button>
  )
}

export default Button