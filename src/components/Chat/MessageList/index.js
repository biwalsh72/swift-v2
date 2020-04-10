import React, { Component } from 'react'
import Compose from '../Compose'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import Message from '../Message'
import moment from 'moment'
import { IonIcon } from '@ionic/react'
import { camera } from 'ionicons/icons'

import styles from './MessageList.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

const MY_USER_ID = 'apple'

export default class MessageList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      setMessages: []
    }

    // this.getMessages = this.getMessages.bind(this)
  }

  

  render () {
    return (
      <div className={styles.scrollbar}>
        <div className={styles['message-list']}>
          <Toolbar
            title='Recipient'
            rightItems={[
              <ToolbarButton
                key='info'
                icon='ion-ios-information-circle-outline'
              />,
              <ToolbarButton key='video' icon='ion-ios-videocam' />,
              <ToolbarButton key='phone' icon='ion-ios-call' />
            ]}
          />

          <div className={styles['message-list-container']}>
            {this.renderMessages}
          </div>

          <Compose
            currentUser={this.props.currentUser}
            rightItems={[
              <ToolbarButton key='photo'>
                <IonIcon icon={camera} />
              </ToolbarButton>,
              <ToolbarButton key='image' ion-icon='image' />,
              <ToolbarButton key='audio' icon='ion-ios-mic' />,
              <ToolbarButton key='money' icon='ion-ios-card' />,
              <ToolbarButton key='games' icon='ion-logo-game-controller-b' />,
              <ToolbarButton key='emoji' icon='ion-ios-happy' />
            ]}
          />
        </div>
      </div>
    )
  }
}
