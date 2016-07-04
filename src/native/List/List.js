import AddTodoMutation from '../mutations/AddTodoMutation';
import Relay from 'react-relay';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import Header from '../common/Header';
import Swipeout from 'react-native-swipeout';
import Todo from './Todo';
import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'white',
  },
});

const todosDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class List extends Component {
  static propTypes = {
    group: PropTypes.string.isRequired,
    style: View.propTypes.style,
  };

  constructor(props, context) {
    super(props, context);
    const { viewer, group } = {}
    const { edges } = props.viewer.todos;
    this.state = {
      initialListSize: edges.length,
      listScrollEnabled: true,
      todosDataSource: todosDataSource.cloneWithRows(edges),
    };
    this.props.relay.setVariables({ group: props.group });
    this.handleMarkAllPress = this.handleMarkAllPress.bind(this);
    this.handleSwipeInactive = this.handleSwipeInactive.bind(this);
    this.handleTextInputSave = this.handleTextInputSave.bind(this);
    this.handleTodoDestroy = this.handleTodoDestroy.bind(this);
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

  handleSwipeInactive(swipeInactive) {
    this.setState({ listScrollEnabled: swipeInactive });
  }

  handleTextInputSave(text) {
    this.props.relay.commitUpdate(
      new AddTodoMutation({ text, viewer: this.props.viewer })
    );
  }

  handleTodoDestroy(todo) {
    this.props.relay.commitUpdate(
      new RemoveTodoMutation({
        todo,
        viewer: this.props.viewer,
      })
    );
  }

  handleMarkAllPress() {
    const numTodos = this.props.viewer.totalCount;
    const numCompletedTodos = this.props.viewer.completedCount;
    const completed = numTodos !== numCompletedTodos;
    this.props.relay.commitUpdate(
      new MarkAllTodosMutation({
        completed,
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      })
    );
  }

  renderTodoEdge(todoEdge) {
    const destroyHandler = this.handleTodoDestroy.bind(null, todoEdge.node);
    return (
      <Swipeout
        key={todoEdge.node.id}
        right={[{
          text: 'Delete',
          type: 'delete',
          onPress: destroyHandler,
        }]}
        scroll={this.handleSwipeInactive}
      >
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
          title={this.props.relay.variables.group}
          background={require('./background.jpg')}
        />
        <ListView
          style={{ flex: 3 }}
          dataSource={this.state.todosDataSource}
          enableEmptySections
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
    group: 'any',
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(
          group: $group,
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
