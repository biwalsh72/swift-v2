import React, { Component } from 'react'
import ConversationList from '../ConversationList'
import MessageList from '../MessageList'
import styles from './Messenger.module.css'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import { cog } from 'ionicons/icons'

export default class Messenger extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={styles['messenger']}>
        {/* <Toolbar
          title="Conversations"
          leftItems={[
            <ToolbarButton key="cog" icon={ cog } />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/*<Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        <div className={[styles['scrollable'], styles['sidebar']].join(' ')}>
          <ConversationList currentUser={this.props.currentUser} />
        </div>

        <div className={[styles['scrollable'], styles['content']].join(' ')}>
          <MessageList currentUser={this.props.currentUser} />
        </div>
      </div>
    )
  }
}
