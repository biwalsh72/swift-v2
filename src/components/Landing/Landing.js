import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'
import styles from './Landing.scss'
import logo from '../../resources/swift.svg'

class Landing extends Component {
  componentDidMount () {
    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        console.log(this.props.location.state.error, {
          timeout: 5000
        })
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {}
        })
      }, 100)
    };
  }

  render () {
    console.log(this.props.authenticated);
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/chat",
            state: { from: this.props.location }
          }}
        />
      )
    }

    return <LandingPage {...this.props} />
  }
}

class LandingPage extends Component {
  render () {
    return (
      <div className={styles.container} data-tid='container'>
        <div className={styles.centerContainer} data-tid='center-container'>
          <img
            className={[styles.imgCenter, styles.noselect].join(' ')}
            src={logo}
            alt='swift-logo'
          />
          <div>
            <h3 className={styles.txt}>Welcome to Swift</h3>
          </div>
          <div className={styles.buttonContainer} data-tid='button-container'>
            <Link to='/login'>
              <Button
                type='submit'
                className={styles.Login}
                data-tid='login-action'
              >
                <div>Login</div>
              </Button>
            </Link>
          </div>
          <div className={styles.buttonContainer} data-tid='button-container'>
            <Link to='/register'>
              <Button
                type='submit'
                className={styles.Login}
                data-tid='login-action'
              >
                <div>Register</div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Landing);