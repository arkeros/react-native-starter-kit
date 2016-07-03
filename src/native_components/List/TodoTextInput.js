import React, { Component, PropTypes } from 'react';
import {
  TextInput,
} from 'react-native';

export default class TodoTextInput extends Component {
  static defaultProps = {
    commitOnBlur: false,
  };

  static propTypes = {
    autoFocus: TextInput.propTypes.autoFocus,
    clearButtonMode: TextInput.propTypes.clearButtonMode,
    commitOnBlur: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    placeholder: TextInput.propTypes.placeholder,
    style: TextInput.propTypes.style,
    value: TextInput.propTypes.value,
    initialValue: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.initialValue || '',
    };
    this.commitChanges = this.commitChanges.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleBlur() {
    if (this.props.commitOnBlur) {
      this.commitChanges();
    }
  }

  handleChangeText(text) {
    if (this.mounted !== false) {
      this.setState({ text });
    }
  }

  handleSubmitEditing() {
    this.commitChanges();
  }

  commitChanges() {
    const newText = this.state.text.trim();
    if (this.props.onDelete && newText === '') {
      this.props.onDelete();
    } else if (this.props.onCancel && newText === this.props.initialValue) {
      this.props.onCancel();
    } else if (newText !== '') {
      this.props.onSave(newText);
      if (this.mounted !== false) {
        this.setState({ text: '' });
      }
    }
  }

  render() {
    return (
      <TextInput
        autoFocus={this.props.autoFocus}
        clearButtonMode={this.props.clearButtonMode}
        onBlur={this.handleBlur}
        onChangeText={this.handleChangeText}
        onSubmitEditing={this.handleSubmitEditing}
        placeholder={this.props.placeholder}
        style={this.props.style}
        underlineColorAndroid="transparent"
        value={this.state.text}
      />
    );
  }
}
