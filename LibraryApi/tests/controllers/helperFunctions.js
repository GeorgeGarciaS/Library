const Book = require('../../models/book');
const Author = require('../../models/author');
const Genre = require('../../models/genre');

exports.getAuthorObj = async function (authorFirstName) {
  const authors = await Author.find({first_name: authorFirstName});
  return authors[0];
};

exports.getGenreObj = async function (genreName) {
  const genres = await Genre.find({name: genreName});
  return genres[0];
};

exports.getBookObj = async function (bookTitle) {
  const books = await Book.find({title: bookTitle});
  return books[0];
};
