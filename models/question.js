'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {

    static associate(models) {
      Question.belongsTo(models.Quiz);
      Question.hasMany(models.Alternative);
    }
  };
  Question.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: { isUUID: 4 }
    },
    question: DataTypes.TEXT('tiny'),
    quizId: {
      type: DataTypes.UUIDV4,
      validate: { isUUID: 4 }
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};