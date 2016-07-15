import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { presenter } from 'adrenaline';

// import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
// import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoTextInput from './common/List/TodoTextInput';


const styles = StyleSheet.create({
  checkbox: {
    width: 40,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 58,

    backgroundColor: 'white',
  },
  input: {
    flex: 1,
  },
  inputText: {
    marginHorizontal: Platform.OS === 'android' ? 11 : 15,
  },
  label: {
    borderBottomColor: Platform.OS === 'android' ? 'transparent' : undefined,
    borderBottomWidth: Platform.OS === 'android' ? 1 : undefined,
    flex: 1,
  },
  labelText: {
    color: 'rgb(77, 77, 77)',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-regular' : 'Avenir',
    fontSize: 24,
    fontWeight: '300',
    marginHorizontal: 15,
    textAlign: 'left',
  },
});

class TodoListItem extends Component {
  static propTypes = {
    onDestroy: PropTypes.func.isRequired,
    style: View.propTypes.style,
    todo: PropTypes.shape({
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }),
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isEditing: false,
    };
    this.handleCompletePress = this.handleCompletePress.bind(this);
    this.handleLabelPress = this.handleLabelPress.bind(this);
    this.handleTextInputCancel = this.handleTextInputCancel.bind(this);
    this.handleTextInputDelete = this.handleTextInputDelete.bind(this);
    this.handleTextInputSave = this.handleTextInputSave.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
  }

  setEditMode(isEditing) {
    this.setState({ isEditing });
  }

  handleCompletePress() {
    const completed = !this.props.todo.completed;
    this.props.relay.commitUpdate(
      new ChangeTodoStatusMutation({
        completed,
        todo: this.props.todo,
        viewer: this.props.viewer,
      })
    );
  }

  handleLabelPress() {
    this.setEditMode(true);
  }

  handleTextInputCancel() {
    this.setEditMode(false);
  }

  handleTextInputDelete() {
    this.setEditMode(false);
    this.props.onDestroy();
  }

  handleTextInputSave(text) {
    this.setEditMode(false);
    this.props.relay.commitUpdate(
      new RenameTodoMutation({ todo: this.props.todo, text })
    );
  }

  renderCompleteCheckbox() {
    const imageModule = this.props.todo.completed ?
      require('./common/List/images/todo_checkbox-active.png') :
      require('./common/List/images/todo_checkbox.png');
    return (
      <TouchableHighlight
        onPress={this.handleCompletePress}
        style={styles.checkbox}
        underlayColor="transparent"
      >
        <Image source={imageModule} />
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        {this.renderCompleteCheckbox()}
        {this.state.isEditing ?
          <TodoTextInput
            autoFocus
            commitOnBlur
            initialValue={this.props.todo.text}
            onCancel={this.handleTextInputCancel}
            onDelete={this.handleTextInputDelete}
            onSave={this.handleTextInputSave}
            style={[styles.labelText, styles.inputText, styles.input]}
          /> :
          <TouchableHighlight
            activeOpacity={1}
            onPress={this.handleLabelPress}
            style={styles.label}
            underlayColor="transparent"
          >
            <Text
              numberOfLines={1}
              style={styles.labelText}
            >
              {this.props.todo.text}
            </Text>
          </TouchableHighlight>
        }
      </View>
    );
  }
}

export default presenter({
  fragments: {
    todo: `
      fragment on Todo {
        completed
        id
        text
      }
    `,
  },
})(TodoListItem);
