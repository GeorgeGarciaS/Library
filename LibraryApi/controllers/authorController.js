const async = require('async');

const authorValidation = require('./authorValidation');
const Author = require('../models/author');
const Book = require('../models/book');

// list of all authors
exports.authorList = function (req, res, next) {
  Author.find()
    .exec((error, authorList) => {
      if (error) {
        return next(error);
      }
      // successful
      return res.status(200).json({authorList});
    });
};

// details for a specific author
exports.authorDetail = function (req, res, next) {
  async.parallel({
    author(callback) {
      Author.findById(req.params.id)
        .exec(callback);
    },
    authors_books(callback) {
      Book.find({ author: req.params.id })
        .exec(callback);
    },
  },
  (error, results) => {
    if (error) {return next(error);} // error in API usage
    if (results.author === null) {
      // no results
      const err = Error('Author not found');
      err.name = 'database error';
      err.status = 404;
      return next(err);
    }
    // successful
    return res.status(200).json({
      // pass only necessary data
      first_name: results.author.first_name,
      family_name: results.author.family_name,
      date_of_birth: results.author.date_of_birth_formatted,
      date_of_death: results.author.date_of_death_formatted,
      books: results.authors_books,
    });
  });
};

// handle author create
exports.authorCreate = [
  authorValidation.validationRules(),
  authorValidation.validate,
  // process request after validation and sanitization
  (req, res, next) => {
    async.parallel({
      // search for repeated input
      author(callback) {
        Author.find({first_name: req.body.first_name, last_name: req.body.last_name})
          .exec(callback);
      },
    },
    (error, results) => {
      // Data is already valid
      // Create an Author object with sanitized data
      if (error) {return next(error);} // error in API usage
      if (results.author.length !== 0) {
        // repeated input
        const err = Error(
          'The first and last names selected are already an author in the database',
        );
        err.name = 'input error';
        err.status = 400;
        return next(err);
      }
      const author = new Author(
        {
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death,
        },
      );
      author.save((err) => {
        if (err) { return next(err); }
        // successful, return sanitized input
        return res.status(200).json({
          first_name: author.first_name,
          family_name: author.family_name,
          date_of_birth: author.date_of_birth,
          date_of_death: author.date_of_death,
        });
      });
    });
  },
];

// handle author delete
exports.authorDelete = function (req, res) {
  return res.status(200).json({});
};

// handle author update
exports.authorUpdate = function (req, res) {
  return res.status(200).json({});
};
