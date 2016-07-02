import {
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

import {
  mutationWithClientMutationId,
  offsetToCursor,
} from 'graphql-relay';

import { TodoEdgeType } from '../types/TodoType';
import { Todo } from '../models';
import viewer from '../queries/viewer';

const addTodo = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    text: { type: new NonNull(StringType) },
  },
  outputFields: {
    todoEdge: {
      type: TodoEdgeType,
      resolve: ({ todo }) => ({
        cursor: offsetToCursor(todo.id - 1),  // TODO check? WTF is this
        node: todo,
      }),
    },
    viewer,
  },
  async mutateAndGetPayload({ text }) {
    const UserId = 1; // TODO
    const todo = await Todo.create({ text, UserId });
    // TODO mucho ojo con esto. puede dar falsos positivos
    // mejor solo devolver la id. y en resolve hacer otra petición
    return { todo };
  },
});

export default addTodo;
