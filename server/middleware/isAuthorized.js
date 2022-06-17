const AppError = require('../utils/appError');

const { User, Article, Comment } = require('../models');

module.exports = (Model) => async (req, res, next) => {
  try {
    const reqUserId = req.auth.userId;
    const hasAccess = req.auth.isAuthorized;
    let objectId;

    if (Model === User) {
      objectId = req.params.userId;
    } else if (Model === Article) {
      objectId = req.params.articleId;
    } else if (Model === Comment) {
      objectId = req.params.commentId;
    }

    const object = await Model.findOne({
      where: {
        id: objectId,
      },
    });
    if (!object) {
      return next(new AppError('Aucun élément trouvé avec cet ID', 404));
    }

    const ownerId = Model === User ? object.id : object.userId;

    if (ownerId !== reqUserId && !hasAccess) {
      return next(new AppError('Requête non autorisée', 403));
    }

    next();
  } catch {
    return next(new AppError('Requête non autorisée', 401));
  }
};
