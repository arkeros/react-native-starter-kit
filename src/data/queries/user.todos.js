import {
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';
import { TodosConnection } from '../types/TodoType';
import { Todo } from '../models';

const userTodos = {
  description: 'A user collection of todos',
  type: TodosConnection,
  args: connectionArgs,
  resolve: ({ id: UserId }, args) => connectionFromPromisedArray(
    Todo.findAll({
      where: { UserId },
    }),
    args
  ),
};

export default userTodos;
