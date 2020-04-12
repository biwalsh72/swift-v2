import React, { useState } from 'react'
import styles from './Compose.module.css'
import { getCurrentUser } from '../../../util/API'

const Compose = ({ submitMessage, isSecret }) => {
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
        <form className={styles.composeForm} onSubmit={this.handleSubmit}>
          <input
            type='text'
            data-tip={inputPlaceHolder}
            className={styles.composeInput}
            placeholder={`Type a message, ${this.props.currentUser.name}`}
            maxLength="500"
            autoFocus
            required
            onChange={this.handleChange}
            value={this.state.message}
          />
        </form>
        {this.props.rightItems}
      </div>
    )
}

export default Compose
