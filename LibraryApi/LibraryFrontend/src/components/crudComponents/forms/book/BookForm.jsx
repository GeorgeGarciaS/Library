import React, {useState} from 'react';

import TextFormGroup from '../TextFormGroup';
import SelectFormGroup from '../SelectFormGroup';
import validate from './bookValidation';

const BookForm = ({
  bookObj, genres, authors, handleOnSubmit,
}) => {
  const [errors, setErrors] = useState({});
  // Initial setup if obj is passed
  const [book, setBook] = useState(() => ({
    title: (bookObj) ? bookObj.title : '',
    author: (bookObj) ? bookObj.author._id : false,
    summary: (bookObj) ? bookObj.summary : '',
    isbn: (bookObj) ? bookObj.isbn : '',
    // multiple genres not implemented
    genre: (bookObj) ? bookObj.genre[0]._id : false,
  }));

  // main form validation
  const handleValidation = () => {
    const [err, formIsValid] = validate(book);
    setErrors(err);
    return formIsValid;
  };

  // check for errors only after submit has been pressed
  const onSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      handleOnSubmit({
        title: book.title,
        author: book.author,
        summary: book.summary,
        isbn: book.isbn,
        genre: [book.genre],
      });
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
      <form onSubmit={onSubmit}>
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

        <button
          variant="primary"
          type="submit"
          className="submit-btn"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default BookForm;
