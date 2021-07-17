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
exports.bookDetail = function (req, res) {
  return res.status(200).json({});
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
