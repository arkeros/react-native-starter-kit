import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ListView,
  StyleSheet,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';


const styles = StyleSheet.create({

  separator: {
    // flex: 2,
    // backgroundColor: 'white',
  },
});

const itemsDataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.__dataID__ !== r2.__dataID__,
});

class List extends Component {
  static propTypes = {
    // TODO items: PropTypes.string.isRequired,
    items: PropTypes.shape({
      edges: PropTypes.array,
    }),
    destroyHandler: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    style: View.propTypes.style,
  };

  constructor(props, context) {
    super(props, context);
    const { edges } = props.items;
    this.state = {
      initialListSize: edges.length,
      listScrollEnabled: true,
      itemsDataSource: itemsDataSource.cloneWithRows(edges),
    };
    this.handleMarkAllPress = this.handleMarkAllPress.bind(this);
    this.handleSwipeInactive = this.handleSwipeInactive.bind(this);
    this.handleTextInputSave = this.handleTextInputSave.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items.edges !== nextProps.items.edges) {
      this.setState({
        itemsDataSource:
          itemsDataSource.cloneWithRows(nextProps.items.edges),
      });
    }
  }

  handleSwipeInactive(swipeInactive) {
    this.setState({ listScrollEnabled: swipeInactive });
  }

  handleTextInputSave(text) {
    // this.props.relay.commitUpdate(
    //   new AddTodoMutation({ text, viewer: this.props.viewer })
    // );
  }

  handleMarkAllPress() {
    // const numTodos = this.props.viewer.totalCount;
    // const numCompletedTodos = this.props.viewer.completedCount;
    // const completed = numTodos !== numCompletedTodos;
    // this.props.relay.commitUpdate(
    //   new MarkAllTodosMutation({
    //     completed,
    //     todos: this.props.viewer.todos,
    //     viewer: this.props.viewer,
    //   })
    // );
  }

  renderItem(itemEdge) {
    const destroyHandler = this.props.destroyHandler.bind(null, itemEdge.node);
    return (
      <Swipeout
        key={itemEdge.node.id}
        right={[{
          text: 'Delete',
          type: 'delete',
          onPress: destroyHandler,
        }]}
        scroll={this.handleSwipeInactive}
      >
        {this.props.renderItem(itemEdge)}
      </Swipeout>
    );
  }

  renderSeparator(sectionId, rowId) {
    return <View key={`sep_${sectionId}_${rowId}`} style={styles.separator} />;
  }

  render() {
    return (
      <ListView
        style={this.props.style}
        dataSource={this.state.itemsDataSource}
        enableEmptySections
        initialListSize={this.state.initialListSize}
        renderRow={this.renderItem}
        renderSeparator={this.renderSeparator}
      />
    );
  }
}

export default List;
