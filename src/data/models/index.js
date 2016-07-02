/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Todo from './Todo';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

User.hasMany(Todo, {as: 'todos'})

User.hasMany(UserLogin, {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasMany(UserClaim, {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

User.hasOne(UserProfile, {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

function sync(...args) {
  return sequelize.sync(...args).then(async () => {

    const admin = await User.create({
      email: 'rafael@arque.ro',
      password: 'admin1234',
    });
    admin.createTodo({ text: 'Apples' });
    admin.createTodo({ text: 'Bananas' });
    admin.createTodo({ text: 'Juice' });
    admin.createTodo({ text: 'Bread' });
    admin.createTodo({ text: 'Cheese' });
    admin.createTodo({ text: 'Milk' });
    admin.createTodo({ text: 'Yogurt' });
  });
}

export default { sync };
export { Todo, User, UserLogin, UserClaim, UserProfile };
