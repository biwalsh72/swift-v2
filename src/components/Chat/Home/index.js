import React, { Component } from 'react'
import Messenger from '../Messenger'
import { Helmet } from 'react-helmet'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

export default class Home extends Component {
  constructor (props) {
    super(props)
  }

  /*<Messenger />*/

  render () {
    return (
      <div className='App'>
        <Messenger />
      </div>
    )
  }
}
