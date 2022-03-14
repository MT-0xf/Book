'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comments.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookId: DataTypes.INTEGER,
    name: DataTypes.STRING(100),
    date: DataTypes.STRING(50),
    content: DataTypes.STRING(200)
  }, {
    sequelize,
    modelName: 'Comments',
    timestamps: false
  });
  return Comments;
};