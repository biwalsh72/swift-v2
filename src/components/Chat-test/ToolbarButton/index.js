import React, { Component } from 'react';
import styles from './ToolbarButton.css';

export default class ToolbarButton extends Component {
  render() {
    const { icon } = this.props;
    return (
      <i className={styles[`toolbar-button ${icon}`]} />
    );
  }
}