import Relay from 'react-relay';

export default class ChangeTodoStatusMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
      }
    `,
    // TODO: Mark completedCount optional
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{changeTodoStatus}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ChangeTodoStatusPayload {
        todo {
          completed,
        },
        viewer {
          todos,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
        viewer: this.props.viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      completed: this.props.completed,
      id: this.props.todo.id,
    };
  }
  getOptimisticResponse() {
    const viewerPayload = {id: this.props.viewer.id};
    if (this.props.viewer.completedCount != null) {
      viewerPayload.completedCount = this.props.completed ?
      this.props.viewer.completedCount + 1 :
      this.props.viewer.completedCount - 1;
    }
    return {
      todo: {
        completed: this.props.completed,
        id: this.props.todo.id,
      },
      viewer: viewerPayload,
    };
  }
}
