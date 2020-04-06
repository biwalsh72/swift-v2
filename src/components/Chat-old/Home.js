// @flow
import React, { Component, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './Home.scss';

import FormBox from './FormBox';
import ChatBox from './ChatBox';
import Conversations from './Conversations/Conversations';
import ConversationsHeader from './Conversations/ConversationsHeader';
import { withRouter } from 'react-router';

class Home extends Component {

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.leftsideBar} data-tid="left-sidebar">
          S
        </div>
        <div
          className={styles.conversationsContainer}
          data-tid="conversations-container"
        >
          <ConversationsHeader currentUser={this.props.currentUser} />
          <Conversations />
        </div>
        <div
          className={styles.rightPaneContainer}
          data-tid="right-pane-container"
        >
          <div className={styles.header} data-tid="chatbox-header">
            <div className={styles.receiver} data-tid="message-reciever">
              Name of receiver
            </div>
          </div>
          <div className={styles.chatBoxContainer} data-tid="chatbox-container">
            <ChatBox />
            <FormBox />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);