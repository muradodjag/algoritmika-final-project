'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coin.init({
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    faceValue: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    country: DataTypes.STRING,
    metal: DataTypes.STRING,
    shortDescription: DataTypes.TEXT,
    longDescription: DataTypes.TEXT,
    quality: DataTypes.STRING,
    weight: DataTypes.DOUBLE,
    obverseImageLink: DataTypes.TEXT,
    reverseImageLink: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Coin',
  });
  return Coin;
};