'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lista.belongsToMany(models.Item, {  //Utilizo belongsToMany porque muchas listas pueden tener muchos items
        through: "ListaItem",
        foreignKey: "id_lista"
      });
    }
  }
  Lista.init({
    id_lista: {
      type: DataTypes.INTEGER,
      primaryKey: true   //Aqui indico que id_lista es la clave primaria de la tabla
    },
    titulo: DataTypes.STRING,
    fecha_creacion: DataTypes.DATEONLY,
    fecha_resolucion: DataTypes.DATEONLY,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lista',
    tablename: 'lista',
    createdAt: false,
    updatedAt: false
  });
  return Lista;
};