import React from 'react';
import styles from './ConversationSearch.module.css';

export default function ConversationSearch() {
    return (
      <div className={styles.conversationSearch}>
        <input
          type="search"
          className={styles.conversationSearchInput}
          placeholder="Search Messages"
        />
      </div>
    );
}