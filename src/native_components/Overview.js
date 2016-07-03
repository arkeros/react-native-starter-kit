import Relay from 'react-relay';
import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
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
        <View style={styles.months} />
      </View>
    );
  }
}

export default Relay.createContainer(Overview, {
  initialVariables: {
    status: 'any',
  },
  fragments: {
    viewer: () => Relay.QL`
        fragment on User {
          email
          news {
            title
            link
            contentSnippet
          }
        }
      `,
  },
});

