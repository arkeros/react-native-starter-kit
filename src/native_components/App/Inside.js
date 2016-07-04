import Overview from '../Overview';
import Groups from '../Groups';
import List from '../List';
import Relay from 'react-relay';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Navigator,
} from 'react-native';


class Inside extends Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'groups':
        return (
          <Groups navigator={navigator} viewer={this.props.viewer} />
        );
      case 'list':
        return (
          <List navigator={navigator} viewer={this.props.viewer} />
        );
      default: // TODO chapuza!
        return (
          <Groups navigator={navigator} viewer={this.props.viewer} />
        );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'groups', name: 'groups', index: 0 }}
        renderScene={this.renderScene}
      />
    );
  }
}

export default Relay.createContainer(Inside, {
  initialVariables: {
    group: 'any',
  },
  fragments: {
    viewer: variables => Relay.QL`
      fragment on User {
        id
        email
        ${Groups.getFragment('viewer', { group: variables.group })}
        ${List.getFragment('viewer', { group: variables.group })}
      }
    `,
  },
});
