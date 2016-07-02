/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import viewer from './queries/viewer';
import content from './queries/content';
import news from './queries/news';

import addTodo from './mutations/todo.add';
import renameTodo from './mutations/todo.rename';
import changeTodoStatus from './mutations/todo.changeStatus';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      viewer,
      content,
      news,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      addTodo,
      renameTodo,
      changeTodoStatus,
    },
  }),
});

export default schema;
