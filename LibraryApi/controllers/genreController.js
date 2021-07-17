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
    genreBooks(callback) {
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
      books: results.genreBooks,
    });
  });
};

// handle genre create
exports.genreCreate = [
  genreValidation.validationRules(),
  genreValidation.validate,
  // process request after validation and sanitization
  (req, res, next) => {
    async.parallel({
      // search for repeated input
      genre(callback) {
        Genre.find({name: req.body.name})
          .exec(callback);
      },
    },
    (error, results) => {
      // Data is already valid
      // Create an genre object with sanitized data
      if (error) {return next(error);} // error in API usage
      if (results.genre.length !== 0) {
        // repeated input
        const err = Error(
          'The name selected are already a genre in the database',
        );
        err.name = 'input error';
        err.status = 400;
        return next(err);
      }
      const genre = new Genre(
        {
          name: req.body.name,
        },
      );
      genre.save((err) => {
        if (err) { return next(err); }
        // successful, return sanitized input
        return res.status(200).json({
          name: genre.name,
        });
      });
    });
  },
];

// handle genre delete
exports.genreDelete = function (req, res, next) {
  async.parallel({
    genre(callback) {
      Genre.findById(req.params.id).exec(callback);
    },
    genre_books(callback) {
      Book.find({ genre: req.params.id }).exec(callback);
    },
  }, (error, results) => {
    if (error) {return next(error);}
    if (results.genre === null) {
      // no results
      const err = Error(
        'Genre does not exist',
      );
      err.name = 'input error';
      err.status = 404;
      return next(err);
    }
    if (results.genre_books.length !== 0) {
      // genre has associated books
      const e = Error(
        'genre has one or more books associated, please delete books first',
      );
      e.name = 'input error';
      e.status = 400;
      return next(e);
    }
    Genre.findByIdAndRemove(req.params.id, (err) => {if (err) {return next(err);}});
    // successful
    return res.status(200).json({
      name: results.genre.name,
    });
  });
};

// handle genre update
exports.genreUpdate = [
  genreValidation.validationRules(),
  genreValidation.validate,
  // process request after validation and sanitization
  (req, res, next) => {
    // data is already valid
    async.parallel({
      // find genre with the same parameters
      repeatedGenre(callback) {
        Genre.find({
          name: req.body.name,
        })
          .exec(callback);
      },
      genre(callback) {
        Genre.findById(req.params.id)
          .exec(callback);
      },
    }, (error, results) => {
      if (error) {return next(error);}
      if (results.repeatedGenre.length !== 0) {
        const err = Error(
          'One genre already exists with same specifications.',
        );
        err.name = 'input error';
        err.status = 400;
        return next(err);
      }
      // Create an Genre object with sanitized data
      const updatedGenre = new Genre({
        _id: req.params.id,
        name: req.body.name,
      });
      Genre.findByIdAndUpdate(req.params.id, updatedGenre, {})
        .exec((err) => {
          if (err) {return next(err);}
          // return genre object with sanitized data
          return res.status(200).json({
            name: req.body.name,
          });
        });
    });
  },
];
