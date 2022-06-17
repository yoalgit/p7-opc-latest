module.exports =
  (...roles) =>
  (req, res, next) => {
    try {
      const isAuthorized = roles.includes(req.auth.role);

      req.auth.isAuthorized = isAuthorized;

      next();
    } catch {
      return next(new AppError('Requête non autorisée', 401));
    }
  };
