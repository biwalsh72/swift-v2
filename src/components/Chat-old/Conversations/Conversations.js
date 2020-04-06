// @flow
import React, { Component } from 'react';
import styles from './Conversations.scss';

export default class Conversations extends Component {

  render() {
    return (
      <div
        className={styles.conversationsList}
        data-tid="conversations-list-content"
      >
        <div
          className={styles.conversationEntry}
          data-tid="conversations-list-entry"
        >
          <div
            className={styles.conversationEntryContent}
            data-tid="conversations-list-entry-content"
            tabIndex="-1"
            data-tab="4"
          >
            <div
              className={styles.conversationEntryName}
              data-tid="conversations-list-entry-name"
            >
              Note to Self
            </div>
          </div>
        </div>
      </div>
    );
  }
}
