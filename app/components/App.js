import Home from './Home';
import Login from './Login';
import HomeRoute from '../routes/HomeRoute';
import React, { Component } from 'react';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,  // TODO rename
    };
    this.login = this.login.bind(this);
  }

  async login({ username, password }) {
    const response = await fetch('http://192.168.1.128:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernameOrEmail: username,
        password,
      }),
    });
    if (response.ok) {
      const { token, user } = await response.json();
      Relay.injectNetworkLayer(
        new DefaultNetworkLayer('http://192.168.1.128:3001/graphql', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
      );
      this.setState({ logged: true });
    } else {
      alert('Wrong email or password!');
    }
  }

  render():void {
    if (!this.state.logged) {
      return (
        <Login login={this.login} />
      );
    }

    return (
      <RootContainer
        Component={Home}
        route={new HomeRoute({ status: 'any' })}
      />
    );
  }
}
