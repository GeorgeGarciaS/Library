const async = require('async');
const bookValidation = require('./bookValidation');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

exports.index = function (req, res, next) {
  async.parallel({
    bookCount(callback) {
      Book.countDocuments({}, callback);
    },
    authorCount(callback) {
      Author.countDocuments({}, callback);
    },
    genreCount(callback) {
      Genre.countDocuments({}, callback);
    },
  }, (error, results) => {
    if (error) {next(error);} // error in API usage
    return res.json({data: results});
  });
};

// list of all books
exports.bookList = function (req, res, next) {
  Book.find()
    .exec((error, bookList) => {
      if (error) {
        return next(error);
      }
      // successful
      return res.status(200).json({bookList});
    });
};

// details for a specific book
exports.bookDetail = function (req, res, next) {
  async.parallel({
    book(callback) {
      Book.findById(req.params.id)
        .exec(callback);
    },
  }, (error, results) => {
    // successful
    if (error) {next(error);} // error in API usage
    if (results.book === null) {
      // no results
      const err = Error('book not found');
      err.name = 'database error';
      err.status = 404;
      return next(err);
    }
    return res.json({
      // pass only necessary data
      title: results.book.title,
      summary: results.book.summary,
      author: results.book.author,
      isbn: results.book.isbn,
      genre: results.book.genre,
    });
  });
};

// handle book create
exports.bookCreate = function (req, res) {
  return res.status(200).json({});
};
// handle book delete
exports.bookDelete = function (req, res) {
  return res.status(200).json({});
};

// handle book update
exports.bookUpdate = function (req, res) {
  return res.status(200).json({});
};
