import React, { useState, useEffect } from 'react'
import Compose from '../Compose'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import Message from '../Message/ChatBubble'
import Axios from 'axios'
import { getChats, sendChat, seenChat } from '../../../services/chatService'
import CryptoJS from 'crypto-js'

import CameraAltIcon from '@material-ui/icons/CameraAlt'
import ImageIcon from '@material-ui/icons/Image'
import MicIcon from '@material-ui/icons/Mic'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhoneIcon from '@material-ui/icons/Phone'
import InfoIcon from '@material-ui/icons/Info'

const { AES, SHA256 } = CryptoJS

import styles from './MessageList.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

const MessageList = ({
  user,
  socket,
  channel,
  getPassphrase,
  handleChannelOpen
}) => {
  const [chats, setChats] = useState([])
  const isSecret = channel !== 'global'
  const passphrase = isSecret && getPassphrase()
  const limit = isSecret ? 100 : 1000

  const source = Axios.CancelToken.source()
  useEffect(() => {
    setChats([])
    const getChannelChats = async () => {
      try {
        const { data: channelChats } = await getChats(channel, limit, {
          cancelToken: source.token
        })

        updateChats(channelChats)
      } catch (error) {
        if (Axios.isCancel(error)) console.log('Caught a Cancel')
        else throw error
      }
    }

    getChannelChats()

    return () => {
      console.log('Cleaning...')
      source.cancel()
      socket.off('new-message')
    }
  }, [channel])

  socket.on('new-message', chat => {
    if (chat.channel !== channel) return
    const chatsToDelete = [...chats, chat]
    const chatLimit = chatsToDelete.splice(-limit)
    updateChats(chatLimit)
  })

  function decryptMsg (msg) {
    const _chats = [...chats]
    const _msg = _chats.find(m => m === msg)

    _msg.name = AES.decrypt(_msg.name, passphrase).toString(CryptoJS.enc.Utf8)
    _msg.timestamp = AES.decrypt(_msg.timestamp, passphrase).toString(
      CryptoJS.enc.Utf8
    )
    _msg.message = AES.decrypt(_msg.message, passphrase).toString(
      CryptoJS.enc.Utf8
    )
    _msg.decrypted = true

    setChats(_chats)
    seenChat(_msg._id, { cancelToken: source.token })
  }

  function updateChats (newChats) {
    if (socket.connected) setChats(newChats)
    updateScroll()
  }

  async function submitMessage (message) {
    const name = user.username
    const timestamp = new Date().toString()

    const userMsg = isSecret
      ? encryptMsg(
          {
            name,
            message,
            timestamp
          },
          passphrase
        )
      : {
          name,
          channel,
          message,
          timestamp
        }

    const { data: chatMsg } = await sendChat(userMsg, {
      cancelToken: source.token
    })

    updateChats([...chats, userMsg])
    socket.emit('broadcast-message', chatMsg)
    // console.log("submtMessage: ", chatMsg);
  }

  function encryptMsg (msgObj, passphrase) {
    for (let k in msgObj) {
      msgObj[k] = AES.encrypt(msgObj[k], passphrase).toString()
    }

    msgObj['channel'] = channel
    msgObj['recieverPbkHash'] = SHA256(
      localStorage.getItem('chatmate_pbk')
    ).toString()
    msgObj['senderPbkHash'] = user.pbkHash
    msgObj['seen'] = false

    return msgObj
  }

  function updateScroll () {
    const chatbox = document.getElementById(styles['message-list-container'])
    if (chatbox) chatbox.scrollTop = chatbox.scrollHeight
  }

  function populateChatBox () {
    let prevMsg = null
    return chats && chats.length === 0 ? (
      <p>No messages yet. Say hello!</p>
    ) : (
      chats.map(msgObj => {
        const chatBubble = (
          <Message
            key={chats.indexOf(msgObj)}
            currUser={user}
            passphrase={passphrase}
            isSecret={isSecret}
            msgObj={msgObj}
            prevMsg={prevMsg}
            decryptMsg={decryptMsg}
            handleChannelOpen={handleChannelOpen}
          />
        )
        prevMsg = msgObj
        return chatBubble
      })
    )
  }

  return (
    <div className={styles.scrollbar}>
      <div className={styles['message-list']}>
        <Toolbar
          title={channel === 'global' ? 'Global Chat' : user.username}
          rightItems={[
            <InfoIcon
              className={styles.topicon}
              key='info'
              style={{ color: 'rgb(0, 153, 255)' }}
            />,
            <VideocamIcon
              key='video'
              className={styles.topicon}
              style={{ color: 'rgb(0, 153, 255)' }}
            />,
            <PhoneIcon
              key='phone'
              className={styles.topicon}
              style={{ color: 'rgb(0, 153, 255)' }}
            />
          ]}
        />

        <div className={styles['message-list-container']}>
          {populateChatBox()}
        </div>

        <Compose
          submitMessage={submitMessage}
          isSecret={isSecret}
          rightItems={[
            <EmojiEmotionsIcon
              key='emojii'
              className={styles.icon}
              style={{ color: 'rgb(0, 153, 255)' }}
            />,
            <CameraAltIcon
              key='camera'
              className={styles.icon}
              style={{ color: 'rgb(0, 153, 255)' }}
            />,
            <ImageIcon
              key='image'
              className={styles.icon}
              style={{ color: 'rgb(0, 153, 255)' }}
            />,
            <MicIcon
              key='mic'
              className={styles.icon}
              style={{ color: 'rgb(0, 153, 255)' }}
            />,
            <ToolbarButton key='money' icon='ion-ios-card' />,
            <ToolbarButton key='games' icon='ion-logo-game-controller-b' />,
            <ToolbarButton key='emoji' icon='ion-ios-happy' />
          ]}
        />
      </div>
    </div>
  )
}

export default MessageList
