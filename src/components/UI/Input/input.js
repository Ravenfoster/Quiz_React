import React from 'react'
import './input.css'

function isinvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched
}

const Input = props => {

  const inputType = props.type || 'text'
  const cls = ['Input']
  const htmlFor = `${inputType}-${Math.random()}`

  if (isinvalid(props)) {
    cls.push('invalid')
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isinvalid(props) ? <span>{props.errorMessage || 'Введите верное начение'}</span> : null}
    </div>
  )
}

export default Input