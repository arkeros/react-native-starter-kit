import React, {
  Component,
} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LoginButton from './LoginButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: Platform.OS === 'android' ? undefined : 20,
  },
  form: {
    flex: 1,
  },
  forgot: {
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'right',
    padding: 20,
  },
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontSize: 20,
    height: 50,
    color: 'white',
  },
  logo: {
    borderRadius: 64,
    height: 128,
    width: 128,
  },
});

class LoginScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: 'rafael@arque.ro',
      password: 'admin1234',
    };
  }

  render() {
    const { username, password } = this.state;
    /* eslint-disable global-require */
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('./images/logo.png')} />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={(username) => this.setState({ username })}
            value={username}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={(password) => this.setState({ password })}
            value={password}
          />
          <Text style={styles.forgot}>Forgot Password</Text>
        </View>
        <LoginButton username={username} password={password} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
        </View>
      </View>
    );
    /* eslint-enable global-require */
  }
}

export default LoginScreen;

