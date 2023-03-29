'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListaItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListaItem.belongsTo(models.Item,{foreignKey: "id_item"});
      ListaItem.belongsTo(models.Lista,{foreignKey: "id_lista"});
    }
  }
  ListaItem.init({
    id_item: DataTypes.INTEGER,
    id_lista: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ListaItem',
    tableName: 'lista_item',
    createdAt: false,
    updatedAt: false
  });
  return ListaItem;
};