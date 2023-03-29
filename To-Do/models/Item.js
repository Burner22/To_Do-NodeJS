'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsToMany(models.Lista, {
        through: "ListaItem",
        foreignKey: "id_item"
      });
    }
  }
  Item.init({
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true  //Aqui indico que id_lista es la clave primaria de la tabla
    },
    titulo: DataTypes.STRING,
    fecha_creacion: DataTypes.DATEONLY,  //Utilizo el DataType DATEONLY para poder utilizar
    fecha_resolucion: DataTypes.DATEONLY,//La Libreria moment para formatear la fecha al modo "YYYY-MM-DD"
    descripcion: DataTypes.STRING,
    prioridad: DataTypes.STRING,
    fecha_limite: DataTypes.DATEONLY,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
    tablename: 'item',
    createdAt: false,
    updatedAt: false
  });
  return Item;
};