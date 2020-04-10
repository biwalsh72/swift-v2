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
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/chat' component={Home} />
          <Route path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
