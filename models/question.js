'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {

    static associate(models) {
      Question.hasMany(models.Alternative);
    }
  };
  Question.init({
    question: DataTypes.TEXT('tiny'),
    quizId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};