import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Colors from '../Colors';
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

// TODO get from ddbb
const groups = [
  { title: 'Shop', items: 25 },
  { title: 'Work', items: 12 },
  { title: 'Health', items: 3 },
  { title: 'Travel', items: 8 },
  { title: 'Bills', items: 16 },
  { title: 'Auto', items: 14 },
];


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
    const content = [0, 2, 4].map(i => {
      const first = groups[i];
      const second = groups[i + 1];
      return (
        <View key={`row_${i}`} style={styles.row}>
          <Group
            style={styles.column}
            onPress={() => this.openList(first.title)}
            title={first.title}
            items={first.items}
            color={Colors.colorForTopic(6, i)}
          />
          <Group
            style={styles.column}
            onPress={() => this.openList(second.title)}
            title={second.title}
            items={second.items}
            color={Colors.colorForTopic(6, i + 1)}
          />
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <Header
          title="My Groups"
          background={require('./background.jpg')}
        />
        <View style={styles.grid}>
          {content}
        </View>
      </View>
    );
  }
}

export default Groups;
