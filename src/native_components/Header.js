import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#373277',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    padding: 10,
    fontWeight: '400',
    fontSize: 64,
  },
  desc: {
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 20,
    fontWeight: '100',
  },

});

function Header() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>React Native</Text>
      <Text style={styles.desc}>Complex apps made easy</Text>

    </View>
  );
}


export default Header;
