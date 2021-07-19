import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import Loading from '../errorHandlingComponents/Loading';
import TextFormGroup from '../helperComponents/TextFormGroup';
import SelectFormGroup from '../helperComponents/SelectFormGroup';

const BookForm = ({
  bookObj, authors, genres, handleOnSubmit,
}) => {
  const [errors, setErrors] = useState({});
  // executed when  component is mounted
  const [book, setBook] = useState(() => ({
    title: (bookObj) ? bookObj.title : '',
    author: (bookObj) ? bookObj.author._id : false,
    summary: (bookObj) ? bookObj.summary : '',
    isbn: (bookObj) ? bookObj.isbn : '',
    genre: (bookObj) ? bookObj.genre[0]._id : false, // multiple genres not implemented
  }));

  // main form validation//
  const handleValidation = () => {
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
    }
    // author
    if (!book.author) {
      formIsValid = false;
      err.author = 'Cannot be empty';
    }

    // summary
    if (!book.summary) {
      formIsValid = false;
      err.summary = 'Cannot be empty';
    }

    if (typeof book.summary !== 'undefined') {
      if (!book.summary.match(/^[a-zA-Z0-9 .]*$/)) {
        formIsValid = false;
        err.summary = 'Only letters, numbers, periods and spaces';
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
    }

    // genre
    if (!book.genre) {
      formIsValid = false;
      err.genre = 'Cannot be empty';
    }

    setErrors(err);
    return formIsValid;
  };

  // check for errors only after submit
  const onSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      handleOnSubmit(book);
    }
  };

  // for further development(real time error handling)
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setBook((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {(_.isEmpty(authors) || _.isEmpty(genres)) ? <Loading />
        : (
          <Form onSubmit={onSubmit}>
            {/* title form */}
            <TextFormGroup
              title="Book Title"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              error={errors.title}
            />
            {/* isbn form */}
            <TextFormGroup
              title="ISBN"
              name="isbn"
              value={book.isbn}
              onChange={handleInputChange}
              error={errors.isbn}
            />
            {/* author form */}
            <SelectFormGroup
              title="Author"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              error={errors.author}
              defaultLabel="Select Author"
              optionsObject={authors}
            />
            {/* genre form */}
            <SelectFormGroup
              title="Genre"
              name="genre"
              value={book.genre}
              onChange={handleInputChange}
              error={errors.genre}
              defaultLabel="Select Genre"
              optionsObject={genres}
            />

            {/* summary */}
            <TextFormGroup
              title="Summary"
              name="summary"
              value={book.summary}
              onChange={handleInputChange}
              error={errors.summary}
            />

            <Button
              style={{margin: '20px 30px'}}
              variant="primary"
              type="submit"
              className="submit-btn"
            >
              Submit
            </Button>
          </Form>
        )}
    </>
  );
};

export default BookForm;
