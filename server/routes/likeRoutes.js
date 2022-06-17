const express = require('express');

// Nested router
const router = express.Router({ mergeParams: true });

// Controllers
const likeController = require('../controllers/likeController');

// Middlewares
const auth = require('../middleware/isAuthentified');

router
  .route('/')
  .get(auth, likeController.getLikesFromArticle)
  .post(auth, likeController.likeHandle);

module.exports = router;
