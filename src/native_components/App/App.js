import Login from '../Login';
import Inside from './Inside';
import HomeRoute from '../routes/Home';
import React, {
  Component,
} from 'react';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';
import {
  Alert,
  StatusBar,
  View,
} from 'react-native';
import { apiUrl } from '../../config';

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
          <Login login={this.login} />
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
          Component={Inside}
          route={new HomeRoute({ group: 'any' })} // TODO do not hardcode!
        />
      </View>
    );
  }
}
