/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React, { useState, useEffect } from 'react'
import {
  postUser,
  checkUsername,
  updateUser
} from '../../services/userService'
import { Button } from 'reactstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'
import styles from './Register.scss'
import logo from '../../resources/swift.svg'
import crypto from 'crypto'
import pbkdf2 from 'pbkdf2'
import CryptoJS from 'crypto-js'
import validate from './validateRegisterForm'
import useForm from "../common/useForm";

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
        Register
      </h3>
      <div className={styles.loginForm} data-tid='login-form'>
        <form onSubmit={handleSubmit}>
        {checkCurrentUser() ? (window.location = "/chat") : ""}
          <label
            className={[styles.loginInfoname, styles.noselect].join(' ')}
            data-tid='username'
          >
            Username
            <div className='username-wrapper'>
              <input
                name='username'
                type='text'
                placeholder='Username'
                className={styles.Input}
                value={username || ""}
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
                value={password || ""}
                errors={errors.password}
                disabled={isLoading}
                onChange={handleChange}
              />
            </div>
          </label>
          <Button
            type='submit'
            className={styles.logmeIn}
            disabled={isLoading}
            data-tid='login-action'
          >
            <div>Register</div>
          </Button>
          <Link to='/login'>
            <p className={styles.signup}>Already have an account?</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

const Register = ({ history }) => {

  async function handleSubmit (username, password, callback) {
    try {
      console.log(password);
      const isExisting = await checkUsername(username)
      if (isExisting) {
        callback()
        return alert('User with the username already exists')
      }
      const auth = pbkdf2
        .pbkdf2Sync(password, username, 25000, 64, 'sha512')
        .toString('hex')

      const { data: user } = await postUser({ username, auth })

      const { _id, auth: _auth, salt } = user

      const ecdh = crypto.createECDH('secp521r1')
      const passphrase = pbkdf2
        .pbkdf2Sync(_auth + password, salt, 25000, 64, 'sha512')
        .toString('hex')

      const publicKey = JSON.stringify(ecdh.generateKeys())
      const pbkHash = CryptoJS.SHA256(publicKey).toString()
      const privateKey = ecdh.getPrivateKey()
      const privateKeyCipher = CryptoJS.AES.encrypt(
        JSON.stringify(privateKey),
        passphrase
      ).toString()

      const { data: _user } = await updateUser(_id, {
        username,
        privateKeyCipher,
        publicKey,
        pbkHash
      })

      console.log(_user)

      console.log('Account has been created.')
      history.push('/login')
    } catch (err) {
      console.log(err)
      callback()
      console.log('Error: ', err.message)
    }
  }

  return (
    <UserForm label="Register" onSubmit={handleSubmit} validate={validate} />
  )
}

export default withRouter(Register)
