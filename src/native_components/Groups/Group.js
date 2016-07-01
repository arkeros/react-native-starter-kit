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
    backgroundColor: 'white',
    padding: 30,

    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontFamily: 'Avenir',
    fontSize: 30,
    textAlign: 'center',
  },
  items: {
    color: 'rgba(29, 29, 38, 0.5)',
    fontSize: 0.44 * 30,
    fontFamily: 'Avenir',
    //opacity: 0.5,
    textAlign: 'center',
  },
  category: {
    backgroundColor: '#50d2c2',
    width: 20,
    height: 5,
    marginTop: 20,
  },
});

class Group extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.number.isRequired,
    color: PropTypes.color,
  };

  render() {
    const { title, items, color: backgroundColor } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.items}>{items} ITEMS</Text>
        <View style={[styles.category, { backgroundColor }]} />

      </View>
    );
  }
}

export default Group;
