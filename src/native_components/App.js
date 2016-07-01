import Overview from './Overview';
import Groups from './Groups';
import Login from './Login';
import HomeRoute from './routes/Home';
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
import { apiUrl } from '../config';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,  // TODO rename
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
      this.setState({ logged: true });
    } else {
      Alert.alert(
        'Overview error',
        'Wrong email or password!',
      );
    }
  }

  render():void {
    if (!this.state.logged) {
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

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          //backgroundColor="blue"
          barStyle="light-content"
        />
        <RootContainer
          Component={Groups}
          route={new HomeRoute({ status: 'any' })}
        />
      </View>
    );
  }
}
