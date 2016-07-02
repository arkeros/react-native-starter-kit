import {
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import { Todo } from '../models';
import viewer from '../queries/viewer';

const removeTodo = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new NonNull(IDType) },
  },
  outputFields: {
    deletedTodoId: {
      type: IDType,
      resolve: ({ id }) => id,
    },
    viewer,
  },
  async mutateAndGetPayload({ id }) {
    const localTodoId = fromGlobalId(id).id;
    console.log(localTodoId);
    const todo = await Todo.findById(localTodoId);
    await todo.destroy();
    return { id };
  },
});

export default removeTodo;
