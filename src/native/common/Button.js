import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

import { Text } from './Text';


const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#61DAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  caption: {
    fontSize: 20,
  },
});

function Button({ onPress, caption, style }) {
  return (
    <TouchableHighlight style={[styles.container, style]} onPress={onPress}>
      <View>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </TouchableHighlight>
  );
}
Button.propTypes = {
  caption: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
};

export default Button;
