import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Navigator,
} from 'react-native';

import Groups from './common/Groups';
import TodoListContainer from './TodoListContainer';


class MyNavigator extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    if (route.list) {
      return <TodoListContainer navigator={navigator} group={route.list} />;
    }

    return <Groups navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
      />
    );
  }
}

export default MyNavigator;
