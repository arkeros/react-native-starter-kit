import Relay from 'react-relay';
import Header from '../Header';
import Group from './Group';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  grid: {
    backgroundColor: '#f4f4f4',
    flex: 3,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    borderWidth: 1,
    borderColor: 'black',
  },
});

class Groups extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          title="My Groups"
          background={require('./background.jpg')}
        />
        <View style={styles.grid}>
          <View style={styles.row}>
            <Group style={styles.column} title="Shop" items={25} color="#50d2c2" />
            <Group style={styles.column} title="Work" items={12} color="#6563a4" />
          </View>
          <View style={styles.row}>
            <Group style={styles.column} title="Health" items={3} color="#8c88ff" />
            <Group style={styles.column} title="Travel" items={8} color="#fcab53" />
          </View>
          <View style={styles.row}>
            <Group style={styles.column} title="Bills" items={16} color="#d667cd" />
            <Group style={styles.column} title="Auto" items={14} color="#ff3366" />
          </View>
        </View>
      </View>
    );
  }
}

export default Relay.createContainer(Groups, {
  initialVariables: {
    status: 'any',
  },
  fragments: {
    me: () => Relay.QL`
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

