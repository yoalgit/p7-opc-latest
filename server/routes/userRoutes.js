const express = require('express');

const router = express.Router();

// Controller
const userCtrl = require('../controllers/userController');

// Middlewares
const isAuthentified = require('../middleware/isAuthentified');
const isGranted = require('../middleware/isGranted');
const isAuthorized = require('../middleware/isAuthorized');
const { userValidation } = require('../middleware/validation/userValidation');
const {
  passwordValidation,
} = require('../middleware/validation/passwordValidation');
const multer = require('../middleware/multer');
const sharp = require('../middleware/sharp');

// Required models for authorization middleware
const { User } = require('../models');

router.route('/').get(isAuthentified, userCtrl.getAllUser);
router.route('/current').get(isAuthentified, userCtrl.getCurrentUser);
router
  .route('/:userId/profile')
  .put(
    isAuthentified,
    isAuthorized(User),
    multer,
    sharp,
    userValidation,
    userCtrl.updateUser
  );
router
  .route('/:userId/password')
  .put(
    isAuthentified,
    isAuthorized(User),
    multer,
    passwordValidation,
    userCtrl.updatePassword
  );
router
  .route('/:userId/articles')
  .get(isAuthentified, userCtrl.getArticlesFromUser);

router
  .route('/:userId')
  .get(isAuthentified, userCtrl.getUser)
  .delete(
    isAuthentified,
    isGranted('admin'),
    isAuthorized(User),
    userCtrl.deleteUser
  );

module.exports = router;
