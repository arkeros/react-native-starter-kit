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
  months: {
  },
  month: {
  },


});

class Overview extends Component {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.months}>
          <Text style={styles.month}>January</Text>
          <Text style={styles.month}>February</Text>
          <Text style={styles.month}>March</Text>
          <Text style={styles.month}>April</Text>
        </View>
        <View style={styles.months}>
        </View>

      </View>
    );
  }
}

export default Overview;

