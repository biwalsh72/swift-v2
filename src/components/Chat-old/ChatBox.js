// @flow
import React, { Component } from 'react';
import styles from './ChatBox.scss';

export default class ChatBox extends Component {

  render() {
    return (
      <div className={styles.messagesContainer} data-tid="messages-container" />
    );
  }
}
