/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/indexRoutes');
const bookRouter = require('./routes/bookRoutes');
const authorRouter = require('./routes/authorRoutes');
const genreRouter = require('./routes/genreRoutes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'LibraryFrontend/build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/index', indexRouter);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/genres', genreRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/LibraryFrontend/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'page not found.'));
});

// error handler
// eslint is not fully compatible with Express, therefore in line exception must be used
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  const extractedErrors = {};
  if (err.errorStack === undefined) {
    // single error
    extractedErrors[err.name] = err.message;
  } else {
    // stack of errors
    err.errorStack.forEach((error) => {
      extractedErrors[error.name] = error.message;
    });
  }
  res.status(err.status || 500).json({errors: extractedErrors});
});

module.exports = app;
