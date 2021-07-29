const validate = (book) => {
  const err = {};
  let formIsValid = true;

  // title
  if (!book.title) {
    formIsValid = false;
    err.title = 'Cannot be empty';
  }

  if (typeof book.title !== 'undefined') {
    if (!book.title.match(/^[a-zA-Z0-9 ]*$/)) {
      formIsValid = false;
      err.title = 'Only letters, numbers and spaces';
    }
    if (book.title.length < 2) {
      formIsValid = false;
      err.title = 'Must be at least two characters';
    }
  }
  // author
  if (book.author === '') {
    formIsValid = false;
    err.author = 'Cannot be empty';
  }

  // summary
  if (!book.summary) {
    formIsValid = false;
    err.summary = 'Cannot be empty';
  }

  if (typeof book.summary !== 'undefined') {
    if (!book.summary.match(/^[a-zA-Z0-9. ]*$/)) {
      formIsValid = false;
      err.summary = 'Only letters, numbers, periods and spaces';
    }
    if (book.summary.length < 10) {
      formIsValid = false;
      err.summary = 'Must be at least ten characters';
    }
  }
  // isbn
  if (!book.isbn) {
    formIsValid = false;
    err.isbn = 'Cannot be empty';
  }

  if (typeof book.isbn !== 'undefined') {
    if (!book.isbn.match(/^[a-zA-Z0-9_]*$/)) {
      formIsValid = false;
      err.isbn = 'Only letters, numbers and underscores';
    }
    if (book.isbn.length < 2) {
      formIsValid = false;
      err.isbn = 'Must be at least two characters';
    }
  }

  // genre
  if (!book.genre) {
    formIsValid = false;
    err.genre = 'Cannot be empty';
  }

  return [err, formIsValid];
};

export default validate;
