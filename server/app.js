const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./errorHandler');

const dataBase = require('./models');
dataBase.sequelize.sync();
// Routers
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '1mb' }));

// ROUTES
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// ERROR HANDLING

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Export app
module.exports = app;
