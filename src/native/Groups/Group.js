import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

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
    color: PropTypes.string, // TODO default and check proptype?
  };

  render() {
    const { title, items, color: backgroundColor } = this.props;
    return (
      <TouchableHighlight style={styles.wrapper} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.items}>{items} ITEMS</Text>
          <View style={[styles.category, { backgroundColor }]} />
        </View>
      </TouchableHighlight>
    );
  }
}

export default Group;
