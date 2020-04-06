import React, { Component } from 'react'
import styles from './Compose.module.css'
import { getCurrentUser } from '../../../util/API'

export default class Compose extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    console.log(this.state.message);
    this.setState({ message: '' });
  }

  render () {
    return (
      <div className={styles['compose']}>
        <form className={styles.composeForm} onSubmit={this.handleSubmit}>
          <input
            type='text'
            className={styles.composeInput}
            placeholder={`Type a message, ${this.props.currentUser.name}`}
            onChange={this.handleChange}
            value={this.state.message}
          />
        </form>
        {this.props.rightItems}
      </div>
    )
  }
}
