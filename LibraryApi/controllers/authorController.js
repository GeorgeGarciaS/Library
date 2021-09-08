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
      repeatedAuthor(callback) {
        Author.find({first_name: req.body.first_name, last_name: req.body.last_name})
          .exec(callback);
      },
    },
    (error, results) => {
      // data is valid
      if (error) {return next(error);} // error in API usage
      if (results.repeatedAuthor.length !== 0) {
        // repeated input
        const err = Error(
          'The first and last names selected are already an author in the database',
        );
        err.name = 'input error';
        err.status = 400;
        return next(err);
      }
      // Create an Author object with sanitized data
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
          date_of_birth: author.date_of_birth_formatted,
          date_of_death: author.date_of_death_formatted,
        });
      });
    });
  },
];

// handle author delete
exports.authorDelete = function (req, res, next) {
  async.parallel({
    author(callback) {
      Author.findById(req.params.id).exec(callback);
    },
    authors_books(callback) {
      Book.find({ author: req.params.id }).exec(callback);
    },
  }, (error, results) => {
    if (error) {return next(error);}
    if (results.author.length === 0) {
      // no results
      const err = Error(
        'Author does not exist.',
      );
      err.name = 'input error';
      err.status = 404;
      return next(err);
    }
    if (results.authors_books.length !== 0) {
      // author has associated books
      const e = Error(
        'Author has one or more books associated, please delete books first.',
      );
      e.name = 'input error';
      e.status = 400;
      return next(e);
    }
    Author.findByIdAndRemove(req.params.id, (err) => {if (err) {return next(err);}});
    // successful
    return res.status(200).json({
      first_name: results.author.first_name,
      family_name: results.author.family_name,
      date_of_birth: results.author.date_of_birth_formatted,
      date_of_death: results.author.date_of_death_formatted,
    });
  });
};

// handle author update
exports.authorUpdate = [
  authorValidation.validationRules(),
  authorValidation.validate,
  // process request after validation and sanitization
  (req, res, next) => {
    // data is already valid
    async.parallel({
      repeatedAuthor(callback) {
        // find authors with the same parameters
        Author.find({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death,
        })
          .exec(callback);
      },
    }, (error, results) => {
      // data is already valid
      if (error) {return next(error);}
      if (results.repeatedAuthor.length !== 0) {
        // repeated input
        const err = Error(
          'One author already exists with same specifications.',
        );
        err.name = 'input error';
        err.status = 400;
        return next(err);
      }
      // Create an Author object with sanitized data
      const updatedAuthor = new Author({
        _id: req.params.id,
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
      Author.findByIdAndUpdate(req.params.id, updatedAuthor, {})
        .exec((err) => {
          if (err) {return next(err);}
          // return Author object with sanitized data
          res.status(200).json({
            first_name: updatedAuthor.first_name,
            family_name: updatedAuthor.family_name,
            date_of_birth: updatedAuthor.date_of_birth_formatted,
            date_of_death: updatedAuthor.date_of_death_formatted,
          });
        });
    });
  },
];
