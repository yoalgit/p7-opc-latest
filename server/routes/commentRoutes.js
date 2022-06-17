const express = require('express');

// Controller
const commentController = require('../controllers/commentController');

// Nested router
const router = express.Router({ mergeParams: true });

// Middlewares
const isAuthentified = require('../middleware/isAuthentified');
const isGranted = require('../middleware/isGranted');
const isAuthorized = require('../middleware/isAuthorized');

// Required models for authorization middleware
const { Comment } = require('../models');

const {
  commentValidation,
} = require('../middleware/validation/commentValidation');

router
  .route('/')
  .post(isAuthentified, commentValidation, commentController.createComment)
  .get(isAuthentified, commentController.getAllComment);

router
  .route('/:commentId')
  .delete(
    isAuthentified,
    isGranted('moderator', 'admin'),
    isAuthorized(Comment),
    commentController.deleteComment
  );

module.exports = router;
