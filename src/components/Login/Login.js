/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React from 'react'
import pbkdf2 from 'pbkdf2'
import CryptoJS from 'crypto-js'
import validate from './validateLoginForm'
import { authUser, checkUsername } from '../../services/userService'
import LoginForm from './LoginForm'

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
    <LoginForm onSubmit={handleSubmit} validate={validate} />
  )
}

export default Login
