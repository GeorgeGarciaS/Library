import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import BookForm from './BookForm';
import Loading from '../errorHandlingComponents/Loading';
import {fetchItems, postBook} from './helperFunctions';

const AddBook = ({history}) => {
  const [authors, setAuthors] = useState({});
  const [genres, setGenres] = useState({});

  // fetch genres on mount
  useEffect(() => {
    const getGenres = async () => {
      const genresFromApi = await fetchItems('http://localhost:8000/genres', history);
      setGenres(genresFromApi.genreList);
    };
    getGenres();
  }, []);

  // fetch authors on mount
  useEffect(() => {
    const getAuthors = async () => {
      const authorsFromApi = await fetchItems('http://localhost:8000/authors', history);
      setAuthors(authorsFromApi.authorList);
    };
    getAuthors();
  }, []);

  // executed when update form is submitted //
  const handleOnSubmit = (newBook) => {
    const bookObj = {
      title: newBook.title,
      author: newBook.author,
      summary: newBook.summary,
      isbn: newBook.isbn,
      genre: [newBook.genre],
    };

    postBook(bookObj, history);
  };

  return (
    <>
      {(_.isEmpty(genres) || _.isEmpty(authors))
        ? <Loading />
        : (
          <BookForm
            handleOnSubmit={handleOnSubmit}
            authors={authors}
            genres={genres}
          />
        )}
    </>
  );
};

export default AddBook;
