import DataType from 'sequelize';
import Model from '../sequelize';

const Todo = Model.define('Todo', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  text: {
    type: DataType.TEXT,
    allowNull: false,
  },

  completed: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },

});

export default Todo;
