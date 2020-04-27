import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import ConversationList from '../ConversationList'
import MessageList from '../MessageList'
import styles from './Messenger.module.css'
import openSocket from 'socket.io-client'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import { cog } from 'ionicons/icons'
import Axios from 'axios'
import crypto from 'crypto'
import { MD5 } from 'crypto-js'
import { getUserProfile, updateUser } from '../../../services/userService'

const socket = openSocket(
  process.env.REACT_APP_SOCKET_ENDPOINT || 'https://swift-web-chat.herokuapp.com/'
)

const Messenger = () => {
  const [user, setUser] = useState({})
  const [channel, setChannel] = useState('global')
  const [isOnline, setIsOnline] = useState(true)

  const userECDH = getECDH()

  const source = Axios.CancelToken.source()
  useEffect(() => {
    socket.connect()

    async function getUser () {
      try {
        const res = await getUserProfile({
          cancelToken: source.token
        })

        const { data: user } = res
        setUser(user)
      } catch (error) {
        if (Axios.isCancel(error)) console.log('Caught Cancel')
        else throw error
      }
    }

    getUser()

    return () => {
      source.cancel()
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    const localIsOnline = localStorage.getItem('isOnline')
    if (!localIsOnline) {
      beOnline()
      localStorage.setItem('isOnline', String(true))
    } else {
      const _localIsOnline = JSON.parse(localIsOnline)

      if (_localIsOnline) beOnline()
      else setIsOnline(false)
    }
  }, [user])

  async function changeStatus () {
    if (isOnline) beOffline()
    else beOnline()
  }

  async function beOnline () {
    const { data: _user } = await updateUser(
      user._id,
      { status: socket.id },
      {
        cancelToken: source.token
      }
    )

    socket.emit('new-user', _user)
    setIsOnline(true)
    localStorage.setItem('isOnline', true)
  }

  function beOffline () {
    socket.emit('user-offline')
    setIsOnline(false)
    localStorage.setItem('isOnline', false)
  }

  function getECDH () {
    const pvkStr = localStorage.getItem('pvk')
    const pvkParse = JSON.parse(pvkStr)
    const pvk = Buffer.from(pvkParse.data)
    const ecdh = crypto.createECDH('secp521r1')
    ecdh.setPrivateKey(pvk)
    return ecdh
  }

  function getPassphrase () {
    const chatMatePbkStr = localStorage.getItem('chatmate_pbk')
    const chatMatePbkParsed = JSON.parse(chatMatePbkStr)
    const chatMatePbk = Buffer.from(chatMatePbkParsed.data)

    if (!userECDH) return console.log('ECDH is null')

    const passphrase = userECDH.computeSecret(chatMatePbk).toString('hex')
    return passphrase
  }

  async function handleUpdateUserBio (bio) {
    const _user = { ...user }
    _user.bio = bio

    try {
      await updateUser(user._id, _user)
      setUser(_user)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChannelOpen (currUser, user) {
    const channelId = getChannelId(currUser, user)
    console.log('running')
    console.log(channelId);

    localStorage.setItem('chatmate_pbk', user.publicKey)
    localStorage.setItem('chatmate', user.username)

    setChannel(channelId)
  }

  function getChannelId (currUser, user) {
    const { publicKey: userPbk } = user
    const { publicKey: cUserPnk } = currUser

    const sorted = [userPbk, cUserPnk].sort()
    const channelId = MD5(sorted.join()).toString()

    return channelId
  }

  return (
    <React.Fragment>
      <div className={styles['messenger']}>
        {/* <Toolbar
          title="Conversations"
          leftItems={[
            <ToolbarButton key="cog" icon={ cog } />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/*<Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        <div className={[styles['scrollable'], styles['sidebar']].join(' ')}>
          <ConversationList
            user={user}
            socket={socket}
            handleChannelOpen={handleChannelOpen}
          />
        </div>

        <div className={[styles['scrollable'], styles['content']].join(' ')}>
          <MessageList
            user={user}
            socket={socket}
            channel={channel}
            getPassphrase={getPassphrase}
            handleChannelOpen={handleChannelOpen}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Messenger
