import React, { useEffect } from 'react'
import shave from 'shave'
import styled from 'styled-components'

import styles from './ConversationListItem.module.css'

const Status = styled.div`
  margin: auto;
  height: 3vh;
  font-size: 14px;
  color: ${({ isOnline }) => (isOnline ? '#000' : '#7e7e7e')};
`

const ConversationListItem = ({
  user,
  currUser,
  handleChannelOpen
}) => {
  useEffect(() => {
    shave('.conversation-snippet', 20)
  })

  return (
    <div className={styles['conversation-list-item']} onClick={() => handleChannelOpen(currUser, user)}>
      <Status
        className={styles['conversation-title']}
        isOnline={Boolean(user.status)}
        onClick={() => handleChannelOpen(currUser, user)}
      />{' '}
      <p className={styles['conversation-title']}>{user.username}</p>
    </div>
  )
}

export default ConversationListItem
