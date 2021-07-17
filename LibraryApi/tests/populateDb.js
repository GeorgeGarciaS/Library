const async = require('async');

const Author = require('../models/author');
const Genre = require('../models/genre');
const Book = require('../models/book');

const authors = [];
const genres = [];
const books = [];

function authorCreate(first_name, family_name, dBirth, dDeath, callback) {
  const authorDetail = {first_name, family_name };
  authorDetail.date_of_birth = dBirth;
  if (dDeath !== false) authorDetail.date_of_death = dDeath;

  const author = new Author(authorDetail);

  author.save((err) => {
    if (err) {
      callback(err);
      return;
    }
    authors.push(author);
    callback(null);
  });
}

function genreCreate(name, callback) {
  const genre = new Genre({name});

  genre.save((err) => {
    if (err) {
      callback(err);
      return;
    }
    genres.push(genre);
    callback(null);
  });
}

function bookCreate(title, summary, isbn, author, genre, callback) {
  const bookDetail = {
    title,
    author,
    summary,
    isbn,
  };
  if (genre !== false) bookDetail.genre = genre;

  const book = new Book(bookDetail);
  book.save((err) => {
    if (err) {
      callback(err);
    }
    books.push(book);
    callback(null);
  });
}

function createAuthors(cb) {
  async.parallel([
    // add more authors if necessary
    function (callback) {
      authorCreate('Test Author', 'Test Author', '2007-01-20', '2017-01-20', callback);
    },
  ],
  cb);
}
function createGenres(cb) {
  async.parallel([
    // add more genres if necessary
    function (callback) {
      genreCreate('Test Genre', callback);
    },
  ],
  cb);
}

function createBooks(cb) {
  async.parallel([
    // add more authors if necessary
    function (callback) {
      bookCreate(
        'Test Book',
        'Summary of test book',
        '0000000000000',
        authors[0],
        [
          genres[0],
        ],
        callback,
      );
    },
  ],
  cb);
}

exports.populateDbNow = function (done) {
  async.series([
    createAuthors,
    createGenres,
    createBooks,
    () => {done();},
  ],
  (err) => {
    if (err) {
      throw err;
    }
  });
};
