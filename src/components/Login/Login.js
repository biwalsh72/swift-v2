/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React, { Component } from 'react'
import { Alert, Button } from 'reactstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'
import styles from './Login.scss'
import logo from '../../resources/swift.svg'
import { login } from '../../util/API'
import { ACCESS_TOKEN } from '../../constants'

class Login extends Component {
  componentDidMount () {
    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        console.log(this.props.location.state.error, {
          timeout: 5000
        })
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {}
        })
      }, 100)
    }
  }

  render () {
    if (this.props.authenticated) {
      return <Redirect
          to={{
          pathname: '/chat',
          state: { from: this.props.location }
      }}/>;
    }

    return <LoginForm {...this.props} />
  }
}

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()

    const loginRequest = Object.assign({}, this.state)

    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        console.log('Successfully Logged In.');
        this.setState({authenticated: true});
      }).catch(error => {
        console.log((error && error.message) || 'There was an error.')
      })
  }

  render () {

    if (this.state.authenticated === true) {
      return <Redirect to='/chat' />
    }

    return (
      <div className={styles.container} data-tid='container'>
        <h3 className={styles.noselect}>
          <img
            className={[styles.imgCenter, styles.noselect].join(' ')}
            src={logo}
            alt='swift-logo'
          />
          Login to Swift
        </h3>
        <div className={styles.loginForm} data-tid='login-form'>
          <form method='post' onSubmit={this.handleSubmit}>
            <label
              className={[styles.loginInfoUserName, styles.noselect].join(' ')}
              data-tid='email'
            >
              Email
              <div className='email-wrapper'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  className={styles.Input}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label
              className={[styles.loginInfoPassword, styles.noselect].join(' ')}
              data-tid='password'
            >
              Password
              <div className='password-wrapper'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  className={styles.Input}
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <Button
              type='submit'
              className={styles.logmeIn}
              data-tid='login-action'
            >
              <div>Login</div>
            </Button>
            <Link to='/register'>
              <p className={styles.signup}>Don&apos;t have an account yet?</p>
            </Link>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
