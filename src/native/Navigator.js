import Groups from './Groups';
import List from './List';
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
    this.setGroup = this.setGroup.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  setGroup(group) {
    alert(group);
    this.props.relay.setVariables({ group });
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'groups', name: 'groups', index: 0 }}
        renderScene={this.renderScene}
      />
    );
  }

  renderScene(route, navigator) {
    switch (route.id) {
      case 'groups':
        return (
          <Groups navigator={navigator} setGroup={this.setGroup} group={this.props.relay.variables.group} viewer={this.props.viewer} />
        );
      case 'list':
        return (
          <List navigator={navigator} group={this.props.relay.variables.group} viewer={this.props.viewer} />
        );
      default: // TODO chapuza!
        return (
          <Groups navigator={navigator} setGroup={this.setGroup} group={this.props.relay.variables.group} viewer={this.props.viewer} />
        );
    }
  }
}

export default Relay.createContainer(Inside, {
  initialVariables: {
    group: 'InsideAny',
  },
  fragments: {
    viewer: (variables) => Relay.QL`
      fragment on User {
        id
        email
        ${Groups.getFragment('viewer', { group: variables.group })}
        ${List.getFragment('viewer', { group: variables.group })}
      }
    `,
  },
});
