import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import {
  connectionArgs,
  connectionFromPromisedArray,
} from 'graphql-relay';
import { TodosConnection } from '../types/TodoType';
import { Group, Todo } from '../models';

const userTodos = {
  description: 'A user collection of todos',
  type: TodosConnection,
  args: {
    group: {
      type: new NonNull(StringType),
    },
    ...connectionArgs,
  },
  async resolve({ id: UserId }, { group: groupName, ...args }) {
    // TODO optimize queries... maybe use JOIN
    const group = await Group.findOne({ where: { name: groupName } });

    return connectionFromPromisedArray(
      Todo.findAll({
        where: { UserId, GroupId: group.id },
      }),
      args
    );
  },
};

export default userTodos;
