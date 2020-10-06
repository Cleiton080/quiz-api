'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.belongsToMany(models.User, {
        through: "UsersQuizzes",
        foreignKey: "quizId",
        otherKey: "userId"
      });

      Quiz.hasMany(models.Question);
    }
  };
  Quiz.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};