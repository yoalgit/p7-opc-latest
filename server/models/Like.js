'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
      Like.belongsTo(models.Article, {
        as: 'article',
        foreignKey: 'articleId',
      });
    }
  }
  Like.init(
    {
      articleId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      isLiked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
