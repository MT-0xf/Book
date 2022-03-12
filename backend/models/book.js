'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING(200),
    author_name: DataTypes.STRING(100),
    page_number: DataTypes.INTEGER,
    file: DataTypes.STRING(999),
    scenario: DataTypes.STRING(9999)
  }, {
    sequelize,
    modelName: 'Book',
    timestamps: false
  });
  return Book;
};