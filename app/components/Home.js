import Relay from 'react-relay';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  actionList: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 20,
  },
  footer: {
    height: 10,
    paddingHorizontal: 15,
  },
  header: {
    alignSelf: 'center',
    color: 'rgba(175, 47, 47, 0.15)',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 100,
    fontWeight: '100',
  },
  list: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      height: -2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
});

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleStatusChange = this._handleStatusChange.bind(this);
  }

  _handleStatusChange(status) {
    this.props.relay.setVariables({ status });
  }

  render() {
    // alert(JSON.stringify(this.props.me));
    return (
      <View style={styles.container}>
        <Text style={styles.header}>NEWS: { this.props.me.news[0].title } </Text>
        <View style={styles.actionList}>

        </View>

      </View>
    );
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {
    status: 'any',
  },
  fragments: {
    me: variables => Relay.QL`
        fragment on User {
          news {
            title
            link
            contentSnippet
          }
        }
      `,
  },
});
