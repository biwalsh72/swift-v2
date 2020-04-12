import React, {useEffect} from 'react';
import shave from 'shave';

import styles from './ConversationListItem.module.css';

export default function ConversationListItem({user, currUser, handleChannelOpen}) {
  useEffect(() => {
    shave('.conversation-snippet', 20);
  })

    return (
      <div className={styles["conversation-list-item"]}>
        <i className={styles.userName} 
        onClick={() => handleChannelOpen(currUser, user)}/>{" "}
        <b>{user.username}</b>
      </div>
    );
}