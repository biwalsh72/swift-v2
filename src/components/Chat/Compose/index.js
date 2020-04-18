import React, { useState } from 'react'
import styles from './Compose.module.css'

const Compose = ({ submitMessage, isSecret, rightItems }) => {
  const [message, setMessage] = useState("")

  function handleChange ({ target }) {
    setMessage(target.value);
  }

  function handleSubmit (e) {
    e.preventDefault();
    if (message.trim() === "") return;
    submitMessage(message)

    setMessage("");
  }

  const inputPlaceHolder = isSecret ? "Private Channel - Encrypted" : "Global Channel - Plain Text"

    return (
      <div className={styles['compose']}>
        <form className={styles.composeForm} onSubmit={handleSubmit}>
          <input
            type='text'
            data-tip={inputPlaceHolder}
            className={styles.composeInput}
            placeholder={`Type a message here...`}
            maxLength="500"
            autoFocus
            required
            onChange={handleChange}
            value={message}
          />
        </form>
        {rightItems}
      </div>
    )
}

export default Compose
