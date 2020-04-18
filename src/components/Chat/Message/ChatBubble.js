import React, { useState } from 'react'
import moment from 'moment'
import styles from './Message.module.css'
import styled from 'styled-components'
import CryptoJS from 'crypto-js'
import { getUser } from '../../../services/userService'
import ChatMsg from './ChatMsg'
import Timestamp from './ChatTime'

const { AES } = CryptoJS

const SenderName = styled.div`
  font-weight: bold;
  font-size: 12px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const Message = ({
  currUser,
  msgObj,
  isSecret,
  passphrase,
  prevMsg,
  decryptMsg,
  handleChannelOpen
}) => {
  const [showTimestamp, setShowTimestamp] = useState(false)

  let { name, message, timestamp, decrypted } = msgObj

  if (isSecret) {
    if (!decrypted) {
      name = AES.decrypt(name, passphrase).toString(CryptoJS.enc.Utf8)
      if (name === currUser.username) decryptMsg(msgObj)
    }
  }

  const displayName = name === currUser.username ? 'You' : name

  function prevSentByUser () {
    if (!prevMsg) return false

    const { name: prevName, decrypted: prevDecrypted } = prevMsg
    const prevNamePlain = isSecret
      ? prevDecrypted
        ? prevName
        : AES.decrypt(prevName, passphrase).toString(CryptoJS.enc.Utf8)
      : prevName
    return prevNamePlain === name
  }

  function decryptMessage () {
    if (!isSecret) return
    decryptMsg(msgObj)
  }

  function handleMsgClick () {
    if (isSecret) {
      if (decrypted) setShowTimestamp(!showTimestamp)
      else decryptMessage()
    } else setShowTimestamp(!showTimestamp)
  }

  async function handleSenderClick () {
    const { data: user } = await getUser({ username: name }, {})
    handleChannelOpen(currUser, user)
  }

  return (
    <div className={styles['bubble-container']}>
      <div className={styles.bubble} onClick={handleSenderClick}>
        <SenderName onClick={handleSenderClick}>
          {prevSentByUser() || displayName}
        </SenderName>
        <ChatMsg
          onClick={handleMsgClick}
          onMouseLeave={() => setTimeout(() => setShowTimestamp(false), 1250)}
          isSecret={isSecret}
          decrypted={decrypted}
          message={message}
        />
        {showTimestamp && (
          <Timestamp
            sentbyUser={name === currUser.username}
            isSecret={isSecret}
            decrypted={decrypted}
            timestamp={timestamp}
            seen={msgObj.seen}
          />
        )}
      </div>
    </div>
  )
}

export default Message
