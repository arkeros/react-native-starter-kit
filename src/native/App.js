import React, {
  Component,
} from 'react';
// AppState
import LoginScreen from './login/LoginScreen';
import Navigator from './Navigator';
import MainRoute from './routes/MainRoute';

import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';
import {
  Alert,
  StatusBar,
  View,
} from 'react-native';
import { apiUrl } from '../config';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signedIn: false,
    };
    this.login = this.login.bind(this);
  }

  async login({ username, password }) {
    const response = await fetch(`${apiUrl}/login`, {
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
      const { token } = await response.json();
      Relay.injectNetworkLayer(
        new DefaultNetworkLayer(`${apiUrl}/graphql`, {
          fetchTimeout: 30000,
          retryDelays: [5000, 10000],
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
      );
      this.setState({ signedIn: true });
    } else {
      Alert.alert(
        'Overview error',
        'Wrong email or password!',
      );
    }
  }

  render():void {
    if (!this.state.signedIn) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
          />
          <LoginScreen login={this.login} />
        </View>
      );
    }

    // TODO must be navigator
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          // backgroundColor="blue"
          barStyle="light-content"
        />
        <RootContainer
          Component={Navigator}
          route={new MainRoute({ group: 'Shop' })} // TODO do not hardcode!
        />
      </View>
    );
  }
}
