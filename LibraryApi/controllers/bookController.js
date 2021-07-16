const async = require('async');
const bookValidation = require('./bookValidation');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

exports.index = function (req, res) {
  return res.status(200).json({});
};

// list of all books
exports.bookList = function (req, res) {
  return res.status(200).json({});
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
