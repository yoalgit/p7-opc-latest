const express = require('express');

const router = express.Router();

// Controllers
const authController = require('../controllers/authController');

// Middlewares
const {
  signupValidation,
} = require('../middleware/validation/signupValidation');
const { loginValidation } = require('../middleware/validation/loginValidation');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/signup', signupValidation, authController.signup);
router.post('/login', rateLimiter, loginValidation, authController.login);

module.exports = router;
