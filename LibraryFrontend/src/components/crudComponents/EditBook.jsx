import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import BookForm from './BookForm';
import Loading from '../errorHandlingComponents/Loading';
import {fetchItems, postBook} from './helperFunctions';

const EditBook = ({history}) => {
  const { id } = useParams();
  const [authors, setAuthors] = useState({});
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState({});

  // fetch book on mount
  useEffect(() => {
    const getBook = async () => {
      const bookFromApi = await fetchItems(`http://localhost:8000/books/${id}`, history);
      setBook(bookFromApi);
    };
    getBook();
  }, []);

  // fetch authors on mount
  useEffect(() => {
    const getAuthors = async () => {
      const authorsFromApi = await fetchItems('http://localhost:8000/authors', history);
      setAuthors(authorsFromApi.authorList);
    };
    getAuthors();
  }, []);

  // fetch genres on mount
  useEffect(() => {
    const getGenres = async () => {
      const genresFromApi = await fetchItems('http://localhost:8000/genres', history);
      setGenres(genresFromApi.genreList);
    };
    getGenres();
  }, []);

  // executed when update form is submitted //
  const handleOnSubmit = (updatedBook) => {
    const bookObj = {
      title: updatedBook.title,
      author: updatedBook.author,
      summary: updatedBook.summary,
      isbn: updatedBook.isbn,
      genre: [updatedBook.genre],
    };

    postBook(bookObj, history);
  };
  console.log(book, genres, authors);
  return (
    <>
      {(_.isEmpty(book) || _.isEmpty(genres) || _.isEmpty(authors))
        ? <Loading />
        : (
          <BookForm
            handleOnSubmit={handleOnSubmit}
            bookObj={book}
            authors={authors}
            genres={genres}
          />
        )}
    </>
  );
};

export default EditBook;
