import React from 'react'
import './auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/input'
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'

class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'E-mail',
        errorMessage: 'Введите корректный e-mail',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите пароль длиной не менее 6 символов',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLenght: 6,
        }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )

  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {

    if (!validation) {
      return true
    }
    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid 
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLenght) {
      isValid = value.length >= validation.minLenght && isValid 
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)
  
    formControls[controlName] = control
   
    let isFormValid = true
    
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })
 
    this.setState({
      formControls: formControls,
      isFormValid: isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {

      const control = this.state.formControls[controlName] 
      return (
        <Input
          key={controlName + index} 
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={'Auth'}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={'AuthForm'}>
            {this.renderInputs()}
            <Button onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
            <Button onClick={this.registerHandler} disabled={!this.state.isFormValid} >Регистрация</Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)