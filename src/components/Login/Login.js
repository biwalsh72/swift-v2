/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React, { useState, useEffect } from 'react'
import { Alert, Button } from 'reactstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'
import styles from './Login.scss'
import logo from '../../resources/swift.svg'
import pbkdf2 from 'pbkdf2'
import CryptoJS from 'crypto-js'
import validate from './validateLoginForm'
import { authUser, checkUsername } from '../../services/userService'
import useForm from '../common/useForm';

const UserForm = ({ label, onSubmit, validate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  );

  const { username, password } = values;

  function doSubmit() {
    setIsLoading(true);

    const onSubmitCallback = () => setIsLoading(false);

    onSubmit(username, password, onSubmitCallback);
  }

  function checkCurrentUser() {
    const aUserIsLoggedIn =
      localStorage.getItem("pvk_phrase") && localStorage.getItem("userToken");

    return Boolean(aUserIsLoggedIn);
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
  );
};

const Login = ({ history }) => {
  async function handleSubmit (username, password, callback) {
    try {
      const doesExist = await checkUsername(username)
      if (!doesExist) {
        callback()
        return alert('User does not exist with that username.')
      }

      const auth = pbkdf2
        .pbkdf2Sync(password, username, 25000, 64, 'sha512')
        .toString('hex')

      const { userToken, user } = await authUser({ username, auth })
      const { auth: _auth, privateKeyCipher, salt, publicKey } = user
      const passphrase = pbkdf2
        .pbkdf2Sync(_auth + password, salt, 25000, 64, 'sha512')
        .toString('hex')

      console.log(passphrase);

      const privateKeyStr = CryptoJS.AES.decrypt(
        privateKeyCipher,
        passphrase
      ).toString(CryptoJS.enc.Utf8)

      localStorage.setItem('userToken', userToken)
      localStorage.setItem('pvk', privateKeyStr)
      localStorage.setItem('pbk', publicKey)

      console.log('Account successfully authenticated.')

      history.push('/chat')
    } catch (err) {
      callback()
      console.log('Authentication Failed: Wrong Credentials.')
      localStorage.clear()
    }
  }

  return (
    <UserForm label="Login" onSubmit={handleSubmit} validate={validate} />
  )
}

export default Login
