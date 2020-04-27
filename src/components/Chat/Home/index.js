import React, { Component } from 'react'
import Messenger from '../Messenger'
import { Helmet } from 'react-helmet'

export default class Home extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='App'>
        <Messenger />
      </div>
    )
  }
}
