const AppError = require('../utils/appError');
const fs = require('fs');

const { Article, User, Comment, Sequelize } = require('../models');

exports.getAllArticle = async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'image',
        'createdAt',
        [
          Sequelize.fn('COUNT', Sequelize.col('comment.articleId')),
          'commentsCount',
        ],
      ],
      group: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstname', 'lastname', 'profilePic'],
        },
        {
          model: Comment,
          as: 'comment',
          attributes: [],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!articles) {
      return next(new AppError('Aucun article pour le moment.', 400));
    }

    return res.status(200).json(articles);
  } catch {
    return next(
      new AppError('erreur lors de la recuperation des articles', 500)
    );
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const { title, content } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/images/article/${
          req.file.filename
        }`
      : undefined;

    const article = await Article.create({
      title: title,
      content: content,
      image: imageUrl,
      userId: userId,
    });

    res.status(201).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch {
    return next(new AppError("erreur lors de la creation de l'article", 500));
  }
};
exports.updateArticle = async (req, res, next) => {
  try {
    const updatedData = req.body;
    // const { userId } = req.auth;
    const { articleId } = req.params;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/images/article/${
          req.file.filename
        }`
      : undefined;

    const article = await Article.update(
      { ...updatedData, image: imageUrl },
      { where: { id: articleId }, returning: true, plain: true }
    );

    if (article[1] === 0) {
      return next(
        new AppError("Aucun article correspondant à cet ID n'a été trouvé", 404)
      );
    }

    return res.status(200).json({
      status: 'success',
      message: "L'article à été mis à jour",
    });
  } catch {
    return next(
      new AppError("erreur lors de la mise a jour de l'article", 500)
    );
  }
};
exports.deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const deletedArticle = await Article.destroy({
      where: {
        id: articleId,
      },
    });

    if (!deletedArticle) {
      return next(new AppError('No article found with that ID', 404));
    }
    res.status(200).json({ status: 'success', message: 'Article supprimé' });
  } catch {
    return next(
      new AppError("erreur lors de la suppression de l'article", 500)
    );
  }
};
