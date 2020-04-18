import React from 'react';
import styles from './Message.module.css'

const ChatMsg = ({ isSecret, decrypted, message, ...rest }) => {
    function displayMessage() {
      if (isSecret) if (!decrypted) return <p>🔒</p>;
  
      return message;
    }
  
    return <div className={styles.message} {...rest}>{displayMessage()}</div>;
  };
  
  export default ChatMsg;