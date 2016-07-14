import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';


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

function Button({ onPress, caption }) {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      <Text style={styles.caption}>{caption}</Text>
    </TouchableHighlight>
  );
}
Button.propTypes = {
  caption: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

export default Button;
