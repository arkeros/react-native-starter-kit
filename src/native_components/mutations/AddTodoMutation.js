import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{addTodo}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload {
        todoEdge,
        viewer {
          todos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(active)': 'append',
        'status(completed)': 'ignore',
      },
    }];
  }
  getVariables() {
    return {
      text: this.props.text,
    };
  }
  getOptimisticResponse() {
    return {
      // FIXME: totalCount gets updated optimistically, but this edge does not
      // get added until the server responds
      todoEdge: {
        node: {
          completed: false,
          text: this.props.text,
        },
      },
      viewer: {
        id: this.props.viewer.id,
      },
    };
  }
}