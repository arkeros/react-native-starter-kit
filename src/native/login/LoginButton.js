import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Alert,
} from 'react-native';

import Button from '../common/Button';

import { logInWithPassword } from '../actions';
import { connect } from 'react-redux';


async function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

class LoginButton extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onLoggedIn: PropTypes.func,
    style: Button.propTypes.style,
  };

  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
    this.logIn = this.logIn.bind(this);
  }

  async logIn() {
    const { dispatch, onLoggedIn, username, password } = this.props;

    this.setState({ isLoading: true });
    try {
      await Promise.race([
        dispatch(logInWithPassword(username, password)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        Alert.alert(message);
        // TODO console.warn(e);
      }
      return;
    } finally {
      this.setState({ isLoading: false });
    }

    if (onLoggedIn) onLoggedIn();
  }

  render() {
    const { style } = this.props;

    if (this.state.isLoading) {
      return (
        <Button
          style={style}
          caption="Please wait..."
          onPress={() => {}}
        />
      );
    }

    return (
      <Button
        style={style}
        caption="Sign in"
        onPress={this.logIn}
      />
    );
  }
}

export default connect()(LoginButton);
