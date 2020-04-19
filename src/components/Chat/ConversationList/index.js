import React, { useState, useEffect } from 'react'
import ConversationSearch from '../ConversationSearch'
import ConversationListItem from '../ConversationListItem'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import { searchUsers } from '../../../services/userService'
import Axios from 'axios'

import styles from './ConversationList.css'

const ConversationList = ({ user, socket, handleChannelOpen }) => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  const source = Axios.CancelToken.source()

  useEffect(() => {
    async function getUsers () {
      try {
        const { data: users } = search
          ? await searchUsers(
              {
                username: { $regex: `${search}.*`, $options: 'i' }
              },
              {
                cancelToken: source.token
              }
            )
          : await getOnlineUsers()
        setUsers(users)
      } catch (error) {
        if (Axios.isCancel(error)) console.log('Caught a Cancel')
        else throw error
      }
    }

    if (user) getUsers()

    return () => {
      console.log('Cleaning...')
      source.cancel()
      socket.off('user-connected')
    }
  }, [user, search])

  async function getOnlineUsers () {
    return await searchUsers(
      { status: { $ne: '' } },
      {
        cancelToken: source.token
      }
    )
  }

  socket.on('user-connected', async _user => {
    if (users.find(u => u.username === _user.username) !== undefined) return

    setUsers([...users, _user])
  })

  socket.on('user-disconnected', async _user => {
    if (users.find(u => u.username === _user.username) === undefined) return

    let onlineUsers = [...users]
    onlineUsers = onlineUsers.filter(u => u.username != _user.username)

    setUsers(onlineUsers)
  })

  const handleSearchChange = ({ target }) => {
    setSearch(target.value)
  }

  function populateUsers () {
    console.log(users)
    if (!users) {
      return (<ConversationListItem key='none'>No one is online...</ConversationListItem>)
    } else {
      return users.map(
        _user =>
          _user.username !== user.username && (
            <ConversationListItem
              key={users.indexOf(_user)}
              user={_user}
              currUser={user}
              handleChannelOpen={handleChannelOpen}
            />
          )
      )
    }
  }

  return (
    <div className={styles.scrollbar}>
      <div className={styles['conversation-list']}>
        <Toolbar
          title='Conversations'
          leftItems={[<ToolbarButton key='cog' icon='ion-ios-cog' />]}
          rightItems={[
            <ToolbarButton key='add' icon='ion-ios-add-circle-outline' />
          ]}
        />
        <ConversationSearch />
        {populateUsers()}
      </div>
    </div>
  )
}

export default ConversationList
