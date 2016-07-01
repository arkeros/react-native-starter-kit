import Relay from 'react-relay';
import Group from './Group';
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
    flex: 2,
  },
  header: {
    //height: 160,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    resizeMode: 'cover',
    height: 100,
    paddingLeft: 30,
  },
  title: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 42,
    fontWeight: '200',
    backgroundColor: 'transparent',
  },
  grid: {
    flex: 3,
  },
  row: {
    backgroundColor: 'gray',
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

        <Image
          style={styles.header}
          source={require('./background.jpg')} >
          <Text style={styles.title}>My Groups</Text>
        </Image>

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

