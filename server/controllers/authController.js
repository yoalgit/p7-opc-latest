const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

const AppError = require('../utils/appError');

const { User } = require('../models');

const key = CryptoJS.enc.Hex.parse(process.env.ENCRYPT_SECRET);

// SIGNUP
exports.signup = async (req, res, next) => {
  try {
    const { email, ...userData } = req.body;

    // Hash password before storage in database
    const hash = await bcrypt.hash(req.body.password, 10);

    // Encrypt user email beofre storage in database
    const encryptedEmail = CryptoJS.AES.encrypt(email, key, {
      mode: CryptoJS.mode.ECB,
    }).toString();

    const [user, created] = await User.findOrCreate({
      where: { email: encryptedEmail },
      defaults: {
        ...userData,
        email: encryptedEmail,
        password: hash,
      },
    });

    if (!created) {
      return next(
        new AppError(
          'Compte déjà existant. Veuillez vous connecter ou choisir un autre email',
          400
        )
      );
    }
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    return res.status(500).send({ err });
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Encrypt email before comparison with store email in database
    const encryptedEmail = CryptoJS.AES.encrypt(email, key, {
      mode: CryptoJS.mode.ECB,
    }).toString();

    const user = await User.findOne({
      where: {
        email: encryptedEmail,
      },
    });
    // if user exists
    if (!user) {
      return next(
        new AppError('Combinaison email / mot de passe invalide', 401)
      );
    }

    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // and password is valid
    if (!passwordIsValid) {
      return next(
        new AppError('Combinaison email / mot de passe invalide', 401)
      );
    }

    // send authentication token
    res.status(200).json({
      token: jwt.sign(
        { userId: user.id, role: user.role },
        process.env.TOKEN_SECRET,
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        }
      ),
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message || 'erreur lors de la connexion',
    });
  }
};
