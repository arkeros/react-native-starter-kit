import {
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import TodoType from '../types/TodoType';
import { Todo } from '../models';
import viewer from '../queries/viewer';

const changeTodoStatus = mutationWithClientMutationId({
  name: 'ChangeTodoStatus',
  inputFields: {
    id: { type: new NonNull(IDType) },
    completed: { type: new NonNull(BooleanType) },
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve: ({ localTodoId }) => Todo.findById(localTodoId),
    },
    viewer,
  },
  async mutateAndGetPayload({ id, completed }) {
    const localTodoId = fromGlobalId(id).id;
    await Todo.update({
      completed,
    }, {
      where: { id: localTodoId },
    });
    return { localTodoId };
  },
});

export default changeTodoStatus;
