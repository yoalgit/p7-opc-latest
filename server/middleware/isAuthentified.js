const jwt = require('jsonwebtoken');

// Authentication
module.exports = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      throw new Error('Requête non authentifiée');
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const { userId, role } = decodedToken;

    req.auth = { userId, role };
    next();
  } catch {
    return next(new AppError('Requête non autorisée', 401));
  }
};
