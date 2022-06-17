const { Comment, Article, User } = require('../models');

const AppError = require('../utils/appError');

// GET ALL COMMENTS FROM ARTICLE
exports.getAllComment = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({
      where: {
        articleId: articleId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstname', 'lastname', 'profilePic'],
        },
      ],
      order: [['createdAt', 'ASC']],
    });
    return res.status(200).json(comments);
  } catch {
    return next(
      new AppError('erreur lors de la recuperation des commentaires', 500)
    );
  }
};

// CREATE COMMENT
exports.createComment = async (req, res, next) => {
  try {
    const commentData = req.body;
    const authorId = req.auth.userId;
    const { articleId } = req.params;

    const article = await Article.findByPk(articleId);
    if (!article) {
      return next(new AppError('Aucun article trouvé avec cet ID', 404));
    }
    const comment = await Comment.create({
      ...commentData,
      userId: authorId,
      articleId: articleId,
    });

    return res.status(201).json({ status: 'success', data: comment });
  } catch {
    return next(new AppError('erreur lors de la creation du commentaire', 500));
  }
};

// DELETE COMMENT
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.destroy({
      where: {
        id: commentId,
      },
    });
    if (!deletedComment) {
      return next(new AppError('No comment found with that ID', 404));
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Commentaire supprimé' });
  } catch {
    return next(
      new AppError('erreur lors de la suppression du commentaire', 500)
    );
  }
};
