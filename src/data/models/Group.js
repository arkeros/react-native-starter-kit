import DataType from 'sequelize';
import Model from '../sequelize';

const Group = Model.define('Group', {
  
  name: {
    type: DataType.TEXT,
    allowNull: false,
  },

});

export default Group;
