import Relay from 'react-relay';
//import StatusButton from './StatusButton';
//import TodoList from './TodoList';
//import TodoListFooter from './TodoListFooter';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this._handleStatusChange = this._handleStatusChange.bind(this);
    }
    _handleStatusChange(status) {
        this.props.relay.setVariables({status});
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>todos</Text>
                <View style={styles.actionList}>
                    <StatusButton
                        active={this.props.relay.variables.status === 'any'}
                        onPress={this._handleStatusChange.bind(null, 'any')}>
                        All
                    </StatusButton>
                    <StatusButton
                        active={this.props.relay.variables.status === 'active'}
                        onPress={this._handleStatusChange.bind(null, 'active')}>
                        Active
                    </StatusButton>
                    <StatusButton
                        active={this.props.relay.variables.status === 'completed'}
                        onPress={this._handleStatusChange.bind(null, 'completed')}>
                        Completed
                    </StatusButton>
                </View>
                <TodoList
                    status={this.props.relay.variables.status}
                    style={styles.list}
                    me={this.props.me}
                />
                <TodoListFooter
                    status={this.props.relay.variables.status}
                    style={styles.footer}
                    me={this.props.me}
                />
            </View>
        );
    }
}

export default Relay.createContainer(Home, {
    initialVariables: {
        status: 'any',
    },
    fragments: {
        me: variables => Relay.QL`
      fragment on User {
        totalCount
      }
    `,
    },
});

const styles = StyleSheet.create({
    actionList: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15,
    },
    container: {
        backgroundColor: '#F5F5F5',
        flex: 1,
        paddingTop: Platform.OS === 'android' ? undefined : 20,
    },
    footer: {
        height: 10,
        paddingHorizontal: 15,
    },
    header: {
        alignSelf: 'center',
        color: 'rgba(175, 47, 47, 0.15)',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontSize: 100,
        fontWeight: '100',
    },
    list: {
        borderTopColor: 'rgba(0,0,0,0.1)',
        borderTopWidth: 1,
        flex: 1,
        shadowColor: 'black',
        shadowOffset: {
            height: -2,
        },
        shadowOpacity: 0.03,
        shadowRadius: 1,
    },
});