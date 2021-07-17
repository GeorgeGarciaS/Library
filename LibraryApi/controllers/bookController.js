const async = require('async');
const bookValidation = require('./bookValidation');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

function bookCreateErrorHandler(results, req) {
  if (results.book.length !== 0) {
    // repeated book input
    const err = Error(
      'The title and author selected are already in another book in the database',
    );
    err.name = 'input error';
    err.status = 400;
    return err;
  }
  if (req.body.genre.length !== results.genre.length) {
    // not all genres are valid ids
    const err = Error(
      'Not all genres specified are not in the database',
    );
    err.name = 'input error';
    err.status = 400;
    return err;
  }
  if (results.author === null) {
    // author id is not valid
    const err = Error(
      'Author ID specified is not in database',
    );
    err.name = 'input error';
    err.status = 400;
    return err;
  }
}

function bookUpdateErrorHandler(results, req) {

}

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
    .populate('author')
    .populate('genre')
    .exec((error, bookList) => {
      if (error) {
        return next(error);
      }
      // successful
      return res.status(200).json({bookList});
    });
};

// details for a specific book
exports.bookDetail = function (req, res, next) {
  async.parallel({
    book(callback) {
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    },
  }, (error, results) => {
    // successful
    if (error) {next(error);} // error in API usage
    if (results.book === null) {
      // no results
      const err = Error('book not found');
      err.name = 'database error';
      err.status = 404;
      return next(err);
    }

    return res.json({
      // pass only necessary data
      title: results.book.title,
      summary: results.book.summary,
      author: results.book.author,
      isbn: results.book.isbn,
      genre: results.book.genre,
    });
  });
};

// handle book create
exports.bookCreate = [
  bookValidation.validationRules(),
  bookValidation.validate,
  // process request after validation and sanitization
  (req, res, next) => {
    async.parallel({
      // search for repeated input
      book(callback) {
        Book.find({title: req.body.title, author: req.body.author})
          .exec(callback);
      },
      // search for valid author input
      author(callback) {
        Author.findById(req.body.author)
          .exec(callback);
      },
      // search for valid genres in genre list
      genre(cb) {
        const genres = [];
        async.map(
          req.body.genre,
          (genreID, callback) => {
            Genre.findById(genreID)
              .exec((err, result) => {
                if (err) {callback(err);}
                if (result !== null || undefined) {genres.push(result);}
                callback(null);
              });
          },
          (err) => {
            cb(err, genres);
          },
        );
      },
    },
    (error, results) => {
      // Data is already valid
      // Create an Book object with sanitized data
      if (error) {return next(error);} // error in API usage
      // check if fetched results are valid
      const e = bookCreateErrorHandler(results, req, next);
      if (e) {return next(e);}

      const book = new Book(
        {
          title: req.body.title,
          author: req.body.author,
          summary: req.body.summary,
          isbn: req.body.isbn,
          genre: req.body.genre,
        },
      );
      book
        .populate('author')
        .populate('genre');
      console.log(book.author);
      book.save((err) => {
        if (err) { return next(err); }
        // successful, return sanitized input
        return res.status(200).json({
          title: book.title,
          author: results.author,
          summary: book.summary,
          isbn: book.isbn,
          genre: results.genre,
        });
      });
    });
  },
];

// handle book delete
exports.bookDelete = function (req, res, next) {
  async.parallel({
    book(callback) {
      // search for valid book ID
      Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .exec(callback);
    },
  }, (error, results) => {
    if (error) {return next(error);}
    if (results.book === null) {
      // no results
      const err = Error(
        'Book does not exist',
      );
      err.name = 'input error';
      err.status = 404;
      return next(err);
    }
    Book.findByIdAndRemove(req.params.id, (err) => {if (err) {return next(err);}});
    // successful
    return res.status(200).json({
      title: results.book.title,
      author: results.book.author,
      summary: results.book.summary,
      isbn: results.book.isbn,
      genre: results.book.genre,
    });
  });
};

// handle book update
exports.bookUpdate = function (req, res) {
  return res.status(200).json({});
};
