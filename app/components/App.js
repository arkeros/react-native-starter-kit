import Home from './Home';
import Login from './Login';
import HomeRoute from '../routes/HomeRoute';
import React, { Component } from 'react';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';

Relay.injectNetworkLayer(
  new DefaultNetworkLayer('http://192.168.1.128:3001/graphql'), {
    headers: {
      Authorization: 'Bearer SSdsbCBmaW5kIHNvbWV0aGluZyB0byBwdXQgaGVyZQ==',
    },
  }
);

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,  // TODO rename
    };
    this.login = this.login.bind(this);
  }

  login({ username, password }) {
    // TODO send to the server
    alert(password);
    this.setState({ logged: true });
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
