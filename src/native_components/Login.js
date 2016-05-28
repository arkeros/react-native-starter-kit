import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

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
    // backgroundColor: 'white',
    borderRadius: 128,
    height: 128,
    width: 128,
  },
  submit: {
    height: 60,
    backgroundColor: '#61DAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 20,
  },
});

class Login extends Component {

  static propTypes = {
    login: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.login(this.state);
  }

  render() {
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
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
          <Text style={styles.forgot}>Forgot Password</Text>
        </View>
        <TouchableHighlight style={styles.submit} onPress={this.handleSubmit}>
          <Text style={styles.submitText}>Sign In</Text>
        </TouchableHighlight>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? Sign Up</Text>
        </View>
      </View>
    );
    /* eslint-enable global-require */
  }
}

export default Login;

