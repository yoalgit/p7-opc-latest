const express = require('express');

const router = express.Router();

// Nested routes
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');

// Controllers
const articleController = require('../controllers/articleController');

// Middlewares
const isAuthentified = require('../middleware/isAuthentified');
const isGranted = require('../middleware/isGranted');
const isAuthorized = require('../middleware/isAuthorized');
const multer = require('../middleware/multer');
const sharp = require('../middleware/sharp');
const {
  articleValidation,
} = require('../middleware/validation/articleValidation');

// Required models for authorization middleware
const { Article } = require('../models');

// Articles
router
  .route('/')
  .get(isAuthentified, articleController.getAllArticle)
  .post(
    isAuthentified,
    multer,
    sharp,
    articleValidation,
    articleController.createArticle
  );
router
  .route('/:articleId/update')
  .put(
    isAuthentified,
    isAuthorized(Article),
    multer,
    sharp,
    articleValidation,
    articleController.createArticle
  );

router
  .route('/:articleId')
  .delete(
    isAuthentified,
    isGranted('moderator', 'admin'),
    isAuthorized(Article),
    articleController.deleteArticle
  );

// Nested Comments and Likes routes
router.use('/:articleId/comments', commentRoutes);
router.use('/:articleId/likes', likeRoutes);

module.exports = router;
