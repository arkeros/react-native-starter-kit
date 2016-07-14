import React, {
  PropTypes,
} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Adrenaline } from 'adrenaline';
import { connect } from 'react-redux';

import { serverURL } from './env';
import networkLayer from './network/networkLayer';
import LoginScreen from './login/LoginScreen';
import Navigator from './Navigator';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function App({ isLoggedIn, token }) {
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0.2)"
        barStyle="light-content"
      />
      <Adrenaline endpoint={`${serverURL}/graphql`} networkLayer={networkLayer(token)}>
        <Navigator />
      </Adrenaline>
    </View>
  );
}
App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

function select(store) {
  return {
    isLoggedIn: store.viewer.isLoggedIn,
    token: store.viewer.token,
  };
}

export default connect(select)(App);
