import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import { container } from 'adrenaline';

import { changeTodoStatus, removeTodo, renameTodo } from './mutations/todo';
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
    this.changeTodoStatus = this.changeTodoStatus.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.renameTodo = this.renameTodo.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  changeTodoStatus({ todo, completed }) {
    this.props.mutate({
      mutation: changeTodoStatus,
      variables: { id: todo.id, completed },
    });
  }

  removeTodo(todo) {
    this.props.mutate({
      mutation: removeTodo,
      variables: { id: todo.id },
    });
  }

  renameTodo({ todo, text }) {
    this.props.mutate({
      mutation: renameTodo,
      variables: { id: todo.id, text },
    });
  }

  renderItem(itemEdge) {
    const destroyHandler = () => this.removeTodo(itemEdge.node);
    return (
      <TodoListItem
        changeStatusHandler={this.changeTodoStatus}
        onDestroy={destroyHandler}
        renameHandler={this.renameTodo}
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
