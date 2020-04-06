/* eslint-disable react/destructuring-assignment */
// @flow
import React, { Component } from 'react';
import styles from './FormBox.scss';

export default class FormBox extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.keypress = this.keypress.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  keypress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(this.state.value);
      this.setState({
        value: ''
      });
    }
  }

  render() {
    return (
      // <div className={styles.formBoxWrapper} data-tid="form-wrapper">
      <textarea
        type="text"
        className={styles.messageInput}
        data-tid="message-input"
        placeholder="Type here..."
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.keypress}
      />
    );
  }
}
