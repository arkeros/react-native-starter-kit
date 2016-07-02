import {
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
} from 'graphql';

import {
  fromGlobalId,
  mutationWithClientMutationId,
} from 'graphql-relay';

import TodoType from '../types/TodoType';
import { Todo } from '../models';

const renameTodo = mutationWithClientMutationId({
  name: 'RenameTodo',
  inputFields: {
    id: { type: new NonNull(IDType) },
    text: { type: new NonNull(StringType) },
  },
  outputFields: {
    todo: {
      type: TodoType,
      resolve: ({ localTodoId }) => Todo.findById(localTodoId),
    },
  },
  mutateAndGetPayload: ({ id, text }) => {
    const localTodoId = fromGlobalId(id).id;
    Todo.update({
      text,
    }, {
      where: { id: localTodoId },
    });
    return { localTodoId };
  },
});

export default renameTodo;
