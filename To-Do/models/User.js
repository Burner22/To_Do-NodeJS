'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id_user: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
        //Aqui indico que id_lista es la clave primaria de la tabla
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tablename: 'user',
    createdAt: false,
    updatedAt: false
  });
  return User;
};