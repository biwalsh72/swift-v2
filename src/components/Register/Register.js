/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @flow
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link, Redirect, withRouter } from 'react-router-dom';
import styles from './Register.scss';
import logo from '../../resources/swift.svg';
import { register } from '../../util/API';

class Register extends Component {
  render() {
    if (this.props.authenticated) {
      return <Redirect to={{
          pathname: '/chat', 
          state: { from: this.props.location }
      }}/>;
    }

    return (
      <RegisterForm {...this.props} />
    )
  }
}

class RegisterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const registerRequest = Object.assign({}, this.state);

    register(registerRequest)
    .then(response => {
      console.log("Successfully registered a new user");
      this.props.history.push("/login");
    }).catch(err => {
      console.error((err && err.message) || 'There was an error. Please try again.');
    });
  }

  render() {
    const { email, name, password } = this.state;
    return (
      <div className={styles.container} data-tid="container">
        <h3 className={styles.noselect}>
          <img
            className={[styles.imgCenter, styles.noselect].join(' ')}
            src={logo}
            alt="swift-logo"
          />
          Register
        </h3>
        <div className={styles.loginForm} data-tid="login-form">
          <form method="post" onSubmit={this.handleSubmit}>
            <label
              className={[styles.loginInfoname, styles.noselect].join(' ')}
              data-tid="email"
            >
              Email
              <div className="email-wrapper">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={styles.Input}
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label
              className={[styles.loginInfoname, styles.noselect].join(' ')}
              data-tid="name"
            >
              name
              <div className="name-wrapper">
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  className={styles.Input}
                  value={name}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <label
              className={[styles.loginInfoPassword, styles.noselect].join(' ')}
              data-tid="password"
            >
              Password
              <div className="password-wrapper">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={styles.Input}
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
            </label>
            <Button
              type="submit"
              className={styles.logmeIn}
              data-tid="login-action"
            >
              <div>Register</div>
            </Button>
            <Link to='/login'>
              <p className={styles.signup}>Already have an account?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
