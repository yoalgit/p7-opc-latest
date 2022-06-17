'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Article, {
        onDelete: 'cascade',
        hooks: 'true',
        foreignKey: 'userId',
        as: 'article',
      });
      User.hasMany(models.Comment, {
        onDelete: 'cascade',
        hooks: 'true',
        foreignKey: 'userId',
        as: 'comment',
      });
      User.hasMany(models.Like, {
        onDelete: 'cascade',
        hooks: 'true',
        foreignKey: 'userId',
        as: 'like',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePic: {
        type: DataTypes.STRING,
        defaultValue: 'http://localhost:3000/images/user/default-profile.png',
      },
      linkedinProfile: DataTypes.STRING,
      twitterProfile: DataTypes.STRING,
      facebookProfile: DataTypes.STRING,
      instagramProfile: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
