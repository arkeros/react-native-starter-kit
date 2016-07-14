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

import AddTodoMutation from './mutations/AddTodoMutation';
import RemoveTodoMutation from './mutations/RemoveTodoMutation';
import List from './common/List';
import TodoListItem from './TodoListItem';


class TodoListContainer extends Component {
  static propTypes = {
    group: PropTypes.string.isRequired,
    style: View.propTypes.style,
  };

  constructor(props, context) {
    super(props, context);
    this.handleSwipeInactive = this.handleSwipeInactive.bind(this);
    this.handleTextInputSave = this.handleTextInputSave.bind(this);
    this.handleTodoDestroy = this.handleTodoDestroy.bind(this);
    this.renderItem = this.renderItem.bind(this);
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
      />
    );
  }

  renderItem(itemEdge) {
    const destroyHandler = this.handleTodoDestroy.bind(null, itemEdge.node);
    return (
      <TodoListItem
        onDestroy={destroyHandler}
        todo={itemEdge.node}
        viewer={this.props.viewer}
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
