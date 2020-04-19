import React from 'react'
import styles from './Message.css'

const ChatMsg = ({ sentbyUser, isSecret, decrypted, message, ...rest }) => {
  function displayMessage () {
    if (isSecret) if (!decrypted) return <p className={styles.encrypted}>🔒</p>

    return message
  }

  return (
    <div className={styles['bubble-container']} {...rest}>
    <div className={styles.bubble}>
      {displayMessage()}
      </div>
    </div>
  )
}

export default ChatMsg
