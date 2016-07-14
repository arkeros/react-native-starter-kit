import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Header from '../Header';
import Group from './Group';


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
  static propTypes = {
    viewer: PropTypes.object,
    navigator: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.openList = this.openList.bind(this);
  }

  openList(group) {
    this.props.navigator.push({
      list: group,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="My Groups"
          background={require('./background.jpg')}
        />
        <View style={styles.grid}>
          <View style={styles.row}>
            <Group style={styles.column} onPress={() => this.openList('Shop')} title="Shop" items={25} color="#50d2c2" />
            <Group style={styles.column} onPress={() => this.openList('Work')} title="Work" items={12} color="#6563a4" />
          </View>
          <View style={styles.row}>
            <Group style={styles.column} onPress={() => this.openList('Health')} title="Health" items={3} color="#8c88ff" />
            <Group style={styles.column} onPress={() => this.openList('Travel')} title="Travel" items={8} color="#fcab53" />
          </View>
          <View style={styles.row}>
            <Group style={styles.column} onPress={() => this.openList('Bills')} title="Bills" items={16} color="#d667cd" />
            <Group style={styles.column} onPress={() => this.openList('Auto')} title="Auto" items={14} color="#ff3366" />
          </View>
        </View>
      </View>
    );
  }
}

export default Groups;
