/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import scrypt from 'scrypt';
import DataType from 'sequelize';
import Model from '../sequelize';

const scryptParameters = scrypt.paramsSync(0.1);

const User = Model.define('User', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
  },

  emailConfirmed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  password_hash: {
    type: DataType.STRING(256),
  },

  password: {
    type: DataType.STRING,
    set(password) {
      this.setDataValue('password', password);
      const kdf = scrypt.kdfSync(password, scryptParameters);
      this.setDataValue('password_hash', kdf);
    },
    validate: {
      isLongEnough(password) {
        if (password.length < 8) {
          throw new Error('Please choose a longer password');
        }
      },
    },
  },

}, {

  instanceMethods: {
    verifyPassword(password) {
      return scrypt.verifyKdfSync(this.password_hash, password);
    },
  },

  indexes: [
    { fields: ['email'] },
  ],

});

export default User;
