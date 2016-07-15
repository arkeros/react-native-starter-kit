import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { container } from 'adrenaline';

// import AddTodoMutation from './mutations/AddTodoMutation';
import removeTodo from './mutations/removeTodo';
import List from './common/List';
import TodoListItem from './TodoListItem';


class TodoListContainer extends Component {
  static propTypes = {
    viewer: PropTypes.object,  // TODO shape
    isFetching: PropTypes.bool.isRequired,
    group: PropTypes.string.isRequired,
    style: View.propTypes.style,
    mutate: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.renderItem = this.renderItem.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  removeTodo(todo) {
    this.props.mutate({
      mutation: removeTodo,
      variables: { id: todo.id },
    });
  }

  renderItem(itemEdge) {
    const destroyHandler = () => this.removeTodo(itemEdge.node);
    return (
      <TodoListItem
        onDestroy={destroyHandler}
        todo={itemEdge.node}
      />
    );
  }

  render() {
    const { group, isFetching, viewer } = this.props;

    if (isFetching) {
      // TODO abstract in component Loader
      return <Text>Loading...</Text>;
    }

    return (
      <List
        title={group}
        items={viewer.todos}
        renderItem={this.renderItem}
        destroyHandler={this.removeTodo}
      />
    );
  }
}

export default container({
  variables(props) {
    return {
      group: props.group,
    };
  },
  query: `
    query ($group: String!) {
      viewer {
        todos(
          group: $group,
          first: 20
        ) {
          edges {
            node {
              id
              ${TodoListItem.getFragment('todo')}
            }
          }
        }
      }
    }
  `,
})(TodoListContainer);
