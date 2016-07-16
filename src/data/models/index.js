/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import sequelize from '../sequelize';
import Group from './Group';
import Todo from './Todo';
import User from './User';
import UserLogin from './UserLogin';
import UserClaim from './UserClaim';
import UserProfile from './UserProfile';

Group.hasMany(Todo, { as: 'todos' });
// TodoListItem.belongsTo(Group, { as: 'group' })

User.hasMany(Todo, { as: 'todos' });

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
    // TODO this is a mess! Use joins!!!
    const admin = await User.create({
      email: 'rafael@arque.ro',
      password: 'admin1234',
    });
    const UserId = admin.id;

    const shop = await Group.create({
      name: 'Shop',
    });

    shop.createTodo({ text: 'Apples', UserId });
    shop.createTodo({ text: 'Bananas', UserId });
    shop.createTodo({ text: 'Cookies', UserId });
    shop.createTodo({ text: 'Juice', UserId });
    shop.createTodo({ text: 'Bread', UserId });
    shop.createTodo({ text: 'Cheese', UserId });
    shop.createTodo({ text: 'Milk', UserId });
    shop.createTodo({ text: 'Oranges', UserId });
    shop.createTodo({ text: 'Water', UserId });
    shop.createTodo({ text: 'Yogurt', UserId });

    const work = await Group.create({
      name: 'Work',
    });

    work.createTodo({ text: 'Hammer', UserId });
    work.createTodo({ text: 'Wood', UserId });

    Group.create({
      name: 'Health',
    });
    Group.create({
      name: 'Travel',
    });
    Group.create({
      name: 'Bills',
    });
    Group.create({
      name: 'Auto',
    });
  });
}

export default { sync };
export { Group, Todo, User, UserLogin, UserClaim, UserProfile };
