import AddTodoMutation from '../mutations/AddTodoMutation';
import Relay from 'react-relay';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import Header from '../Header';
import Todo from './Todo';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  ListView,
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
});

const todosDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class List extends Component {
  static propTypes = {
    status: PropTypes.oneOf(['active', 'any', 'completed']).isRequired,
    style: View.propTypes.style,
  };
  constructor(props, context) {
    super(props, context);
    const { edges } = props.viewer.todos;
    this.state = {
      initialListSize: edges.length,
      listScrollEnabled: true,
      todosDataSource: todosDataSource.cloneWithRows(edges),
    };
    this.renderTodoEdge = this.renderTodoEdge.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.viewer.todos.edges !== nextProps.viewer.todos.edges) {
      this.setState({
        todosDataSource:
          todosDataSource.cloneWithRows(nextProps.viewer.todos.edges),
      });
    }
  }

  renderTodoEdge(todoEdge) {
    return (
      <Swipeout
        key={todoEdge.node.id}
        right={[{
          text: 'Delete',
          type: 'delete',
          onPress: destroyHandler,
        }]}
        scroll={this._handleSwipeInactive}>
        <Todo
          onDestroy={destroyHandler}
          style={styles.todo}
          todo={todoEdge.node}
          viewer={this.props.viewer}
        />
      </Swipeout>
    );
  }

  renderSeparator(sectionId, rowId) {
    return <View key={`sep_${sectionId}_${rowId}`} style={styles.separator} />;
  }

  render() {

    return (
      <View style={styles.container}>
        <Header
          title="Shop"
          background={require('./background.jpg')}
        />
        <ListView
          dataSource={this.state.todosDataSource}
          enableEmptySections={true}
          initialListSize={this.state.initialListSize}
          renderRow={this.renderTodoEdge}
          renderSeparator={this.renderSeparator}
        />
      </View>
    );
  }
}

export default Relay.createContainer(List, {
  initialVariables: {
    status: 'any',
  },
  prepareVariables({status}) {
    let nextStatus;
    if (status === 'active' || status === 'completed') {
      nextStatus = status;
    } else {
      // This matches the Backbone example, which displays all todos on an
      // invalid route.
      nextStatus = 'any';
    }
    return {
      status: nextStatus,
    };
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(
          first: 20
        ) {
          edges {
            node {
              id
              ${RemoveTodoMutation.getFragment('todo')}
              ${Todo.getFragment('todo')}
            }
          }
        }
        ${AddTodoMutation.getFragment('viewer')}
        ${RemoveTodoMutation.getFragment('viewer')}
        ${Todo.getFragment('viewer')}
      }
    `,
  },
});
