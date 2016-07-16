import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';

import { Text } from '../Text';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    marginRight: 1,
    marginBottom: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 5,
  },
  items: {
    fontSize: 0.44 * 26,
    textAlign: 'center',
    opacity: 0.5,
  },
  category: {
    width: 20,
    height: 3,
    marginTop: 15,
  },
});


function Group({ title, items, color: backgroundColor, onPress }) {
  return (
    <TouchableHighlight style={styles.wrapper} onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.items}>{items} ITEMS</Text>
        <View style={[styles.category, { backgroundColor }]} />
      </View>
    </TouchableHighlight>
  );
}
Group.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  items: PropTypes.number.isRequired,
  color: PropTypes.string, // TODO default and check proptype?
};

export default Group;
