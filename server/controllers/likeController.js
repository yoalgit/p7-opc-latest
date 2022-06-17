const { Like, Article } = require('../models');

const AppError = require('../utils/appError');

exports.likeHandle = async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const { articleId } = req.params;
    const { isLiked } = req.body;

    const article = await Article.findByPk(articleId);
    if (!article) {
      return next(new AppError('Aucun article trouvé avec cet ID', 404));
    }

    if (isLiked) {
      const [like, created] = await Like.findOrCreate({
        where: { userId: userId, articleId: articleId },
        defaults: {
          userId: userId,
          articleId: articleId,
          isLiked: true,
        },
      });

      if (!created) {
        if (!like.isLiked) {
          await like.update({ isLiked: false });
          return res
            .status(200)
            .json({ status: 'success', message: 'Like ajouté' });
        }
        return next(new AppError('Vous aimez déjà cet article', 400));
      }
      return res
        .status(201)
        .json({ status: 'success', message: 'Like ajouté' });
    }

    const deletedLike = await Like.destroy({
      where: {
        userId: userId,
        articleId: articleId,
      },
    });

    if (!deletedLike) {
      return next(
        new AppError('Vous ne pouvez supprimer un like inexistant', 400)
      );
    }
    return res
      .status(200)
      .json({ status: 'success', message: 'Like supprimé' });
  } catch {
    return next(new AppError('erreur lors de la gestion du like ', 500));
  }
};

exports.getLikesFromArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    // Check if article exists
    const article = await Article.findByPk(articleId);
    if (!article) {
      return next(new AppError('Aucun article trouvé avec cet ID', 404));
    }
    const likes = await Like.findAll({
      where: {
        articleId: articleId,
      },
      attributes: ['userId'],
    });

    res.status(201).json(likes);
  } catch {
    return next(
      new AppError("erreur lors de la recuperation de l'article", 500)
    );
  }
};
