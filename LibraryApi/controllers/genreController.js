const async = require('async');

const genreValidation = require('./genreValidation');
const Genre = require('../models/genre');
const Book = require('../models/book');

// list of all genre
exports.genreList = function (req, res) {
  return res.status(200).json({});
};

// details for a specific genre
exports.genreDetail = function (req, res) {
  return res.status(200).json({});
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
