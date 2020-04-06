import React, { Component } from 'react'
import ConversationSearch from '../ConversationSearch'
import ConversationListItem from '../ConversationListItem'
import Toolbar from '../Toolbar'
import ToolbarButton from '../ToolbarButton'
import _ from 'lodash'

import styles from './ConversationList.css'

export default class ConversationList extends Component {
  constructor (props) {
    this.state = {
      conversations: [],
      conversationsFetched: false,
      search: '',
      unreadCounts: []
    }
  }

  componentDidUpdate (prevProps) {
    if (
      (_.isEmpty(this.state.conversations) &&
        this.state.conversationsFetched === false) ||
      this.props.lastMessageId !== prevProps.lastMessageId
    ) {
      var conversationsRequest = new CometChat.ConversationsRequestBuilder()
        .setLimit(50)
        .build()

      conversationsRequest.fetchNext().then(
        conversationList => {
          this.setState({
            conversations: conversationList,
            conversationsFetched: true
          })
        },
        error => {
          this.setState({
            conversations: [],
            conversationsFetched: true
          })
        }
      )
    }
  }

  handleChange (e) {
    this.setState({ search: event.target.value });
  }

  render () {
    const { conversations, conversationsFetched } = this.state

    const conver_length = conversations.length

    if (conver_length === 0 && this.state.search !== '') {
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
          <div className={styles['conversation-list-item']}>
            <div className={styles['conversation-info']}>
              <h3 className={styles['conversation-title']}>Note to Self</h3>
            </div>
          </div>
          {conversations.map(conversation => (
            <ConversationListItem key={conversation.name} data={conversation} />
          ))}
        </div>
      </div>
    )
  }
}
