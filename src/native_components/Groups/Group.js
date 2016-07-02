import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    marginRight: 1,
    marginBottom: 1,
    alignItems: 'center',
  },
  title: {
    color: '#1d1d26',
    fontFamily: 'Avenir',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 5,
  },
  items: {
    color: '#1d1d26',
    fontSize: 0.44 * 26,
    fontFamily: 'Avenir',
    textAlign: 'center',
    opacity: 0.5,
  },
  category: {
    width: 20,
    height: 3,
    marginTop: 15,
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
