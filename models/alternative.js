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
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: { isUUID: 4 }
    },
    alternative: DataTypes.TEXT('tiny'),
    isCorrect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    questionId: {
      type: DataTypes.UUIDV4,
      validate: { isUUID: 4 }
    }
  }, {
    sequelize,
    modelName: 'Alternative',
  });
  return Alternative;
};