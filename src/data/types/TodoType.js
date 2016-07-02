import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import {
  connectionDefinitions,
  globalIdField,
} from 'graphql-relay';

const TodoType = new ObjectType({
  name: 'Todo',
  fields: {
    id: globalIdField('Todo'),
    text: { type: StringType },
    completed: { type: BooleanType },
  },
});

export default TodoType;

const {
  connectionType,
  edgeType,
} = connectionDefinitions({
  name: 'Todo',
  nodeType: TodoType,
});

export const TodosConnection = connectionType;
export const TodoEdgeType = edgeType;
