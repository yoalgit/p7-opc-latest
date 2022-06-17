const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');
const fs = require('fs');

const { User, Article, Comment, Sequelize } = require('../models');

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['email', 'password', 'createdAt', 'updatedAt'] },
    });
    return res.status(200).send(users);
  } catch {
    return next(new AppError('erreur lors de la recuperation du profil', 500));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: { exclude: ['email', 'password', 'createdAt', 'updatedAt'] },
    });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    return res.status(200).json({ user });
  } catch {
    return next(new AppError('erreur lors de la recuperation du profil', 500));
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.auth.userId,
      },
      attributes: ['id', 'role'],
    });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    res.status(200).json({ user });
  } catch {
    return next(new AppError('erreur lors de la recuperation du profil', 500));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updatedData = req.body;
    const { userId } = req.params;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/images/user/${req.file.filename}`
      : undefined;

    const user = await User.update(
      { ...updatedData, profilePic: imageUrl },
      { where: { id: userId }, returning: true, plain: true }
    );

    if (user[1] === 0) {
      return next(
        new AppError(
          "Aucun utilisateur correspondant à cet ID n'a été trouvé",
          404
        )
      );
    }

    return res.status(200).json({
      status: 'success',
      message: "Le profil de l'utilisateur à été mis à jour",
    });
  } catch {
    return next(new AppError('erreur lors de la mise a jour du profil', 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.destroy({
      where: { id: userId },
    });

    if (!deletedUser) {
      return next(new AppError('No user found with that ID', 404));
    }
    return res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch {
    return next(new AppError('erreur lors de la suppression du profil', 500));
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, updatedPassword } = req.body;
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return next(new AppError("Cet utilisateur n'existe pas", 404));
    }

    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsValid) {
      return next(new AppError('Ancien mot de passe invalide', 403));
    }

    const hash = await bcrypt.hash(updatedPassword, 10);
    await User.update(
      { password: hash },
      { where: { id: userId }, returning: false }
    );
    return res
      .status(200)
      .json({ status: 'success', message: 'Le mot de passe a été mis à jour' });
  } catch {
    return next(
      new AppError('erreur lors de la mise à jour du mot de passe', 500)
    );
  }
};

exports.getArticlesFromUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const articles = await Article.findAll({
      where: {
        userId: userId,
      },
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
