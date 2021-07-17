const async = require('async');

const genreValidation = require('./genreValidation');
const Genre = require('../models/genre');
const Book = require('../models/book');

// list of all genre
exports.genreList = function (req, res, next) {
  Genre.find()
    .exec((err, genreList) => {
      if (err) {
        return next(err);
      }
      // successful
      return res.status(200).json({genreList});
    });
};

// details for a specific genre
exports.genreDetail = function (req, res, next) {
  async.parallel({
    genre(callback) {
      Genre.findById(req.params.id)
        .exec(callback);
    },
    genre_books(callback) {
      Book.find({genre: req.params.id})
        .exec(callback);
    },
  },
  (error, results) => {
    // successful
    if (error) {return next(error);} // error in API usage
    if (results.genre === null) {
      // no results
      const err = Error('Genre not found');
      err.name = 'database error';
      err.status = 404;
      return next(err);
    }
    // successful
    return res.status(200).json({
      // pass only necessary data
      name: results.genre.name,
      books: results.books,
    });
  });
};

// handle genre create
exports.genreCreate = function (req, res) {
  return res.status(200).json({});
};

// handle genre delete
exports.genreDelete = function (req, res) {
  return res.status(200).json({});
};

// handle genre update
exports.genreUpdate = function (req, res) {
  return res.status(200).json({});
};
