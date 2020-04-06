import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'

import { getCurrentUser } from './util/API'
import { ACCESS_TOKEN } from './constants'
import OAuth2RedirectHandler from './util/oauth2/OAuth2RedirectHandler'

import PrivateRoute from './components/common/PrivateRoute'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import NotFound from './components/common/NotFound'
import Register from './components/Register/Register'
import Loading from './components/common/Loading'
import Home from './components/Chat/Home/index'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }

    this.loadcurrentUser = this.loadcurrentUser.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  loadcurrentUser () {
    this.setState({
      loading: true
    })

    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }

  loggedIn () {
    this.setState({authenticated: true});
    console.log(this.state.authenticated);
  }

  handleLogout () {
    localStorage.removeItem(ACCESS_TOKEN)
    this.setState({
      authenticated: false,
      currentUser: null
    })
    console.log('Successfully logged out.')
  }

  componentDidMount () {
    this.loadcurrentUser();
  }

  render () {
    if (this.state.loading) {
      return <Loading />
    }

    return (
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <Landing authenticated={this.state.authenticated} {...props} />
            )}
          />
          <Route path='/logout' onEnter={this.handleLogout} />
          <PrivateRoute
            path='/chat'
            authenticated={this.state.authenticated}
            currentUser={this.state.currentUser}
            component={Home}
          />
          <Route
            exact
            path='/login'
            render={props => (
              <Login authenticated={this.state.authenticated} {...props} />
            )}
          />
          <Route
            exact
            path='/register'
            render={props => (
              <Register authenticated={this.state.authenticated} {...props} />
            )}
          />
          <Route path='/oauth2/redirect' component={OAuth2RedirectHandler} />
          <Route exact component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
