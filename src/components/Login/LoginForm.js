import React, {useState, useEffect } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import styles from './Login.scss'
import logo from '../../resources/swift.svg'
import useForm from '../common/useForm'

const LoginForm = ({ onSubmit, validate }) => {
  const [isLoading, setIsLoading] = useState(false)

  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  )

  const { username, password } = values

  function doSubmit () {
    setIsLoading(true)

    const onSubmitCallback = () => setIsLoading(false)

    onSubmit(username, password, onSubmitCallback)
  }

  function checkCurrentUser () {
    const aUserIsLoggedIn =
      localStorage.getItem('pvk_phrase') && localStorage.getItem('userToken')

    return Boolean(aUserIsLoggedIn)
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
        <form onSubmit={handleSubmit}>
          {checkCurrentUser() ? (window.location = '/chat') : ''}
          <label
            className={[styles.loginInfoUserName, styles.noselect].join(' ')}
            data-tid='username'
          >
            Username
            <div className='username-wrapper'>
              <input
                name='username'
                type='text'
                placeholder='Username'
                className={styles.Input}
                value={username || ''}
                errors={errors.username}
                autoFocus
                disabled={isLoading}
                onChange={handleChange}
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
                value={password || ''}
                errors={errors.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </label>
          <Button
            type='submit'
            className={styles.logmeIn}
            data-tid='login-action'
            disabled={isLoading}
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

export default LoginForm
