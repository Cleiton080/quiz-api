'use strict';
const { Model } = require('sequelize');
const { hashSync } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Quiz, {
        through: "UsersQuizzes",
        foreignKey: "userId",
        otherKey: "quizId"
      });
    }
  };
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: { isUUID: 4 }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        isLowercase: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      set(value) { this.setDataValue("password", hashSync(value, 10)) },
      validate: {
        notEmpty: true
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};