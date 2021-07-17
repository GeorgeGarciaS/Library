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
exports.authorDetail = function (req, res) {
  return res.status(200).json({});
};

// handle author create
exports.authorCreate = function (req, res) {
  return res.status(200).json({});
};

// handle author delete
exports.authorDelete = function (req, res) {
  return res.status(200).json({});
};

// handle author update
exports.authorUpdate = function (req, res) {
  return res.status(200).json({});
};
