'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alternative extends Model {
    static associate(models) {
      Alternative.belongsTo(models.Question);
    }
  };
  Alternative.init({
    alternative: DataTypes.TEXT('tiny'),
    questionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Alternative',
  });
  return Alternative;
};