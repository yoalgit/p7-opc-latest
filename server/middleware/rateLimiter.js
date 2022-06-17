const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 5 minutes)
  message:
    'Trop de tentatives de connexion, veuillez réessayer dans 5 minutes.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
