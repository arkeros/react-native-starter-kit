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
  resolve: (company, args) => connectionFromPromisedArray(
    Todo.findAll({
      where: { UserId: 1 }, // TODO id no hardcodeada !
    }),
    args
  ),
};

export default userTodos;
