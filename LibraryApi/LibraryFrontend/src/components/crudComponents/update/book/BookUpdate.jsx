import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import BookForm from '../../forms/book/BookForm';
import {fetchItems, putItems} from '../../crudHelperFunctions';
import Update from '../Update';

const BookUpdate = ({history}) => {
  const {id} = useParams();
  const [authors, setAuthors] = useState({});
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // fetch book on mount
  useEffect(() => {
    const getBook = async () => {
      const bookFromApi = await fetchItems(`/books/${id}`, history);
      setBook(bookFromApi);
    };
    getBook();
  }, []);

  // fetch authors on mount
  useEffect(() => {
    const getAuthors = async () => {
      const authorsFromApi = await fetchItems('/authors', history);
      setAuthors(authorsFromApi ? authorsFromApi.authorList : {});
    };
    getAuthors();
  }, []);

  // fetch genres on mount
  useEffect(() => {
    const getGenres = async () => {
      const genresFromApi = await fetchItems('/genres', history);
      setGenres(genresFromApi ? genresFromApi.genreList : {});
    };
    getGenres();
  }, []);

  // check if finished fetching
  useEffect(() => {
    if (!_.isEmpty(authors) && !_.isEmpty(genres) && !_.isEmpty(book)) {
      setIsLoading(false);
    }
  }, [authors, genres, book]);

  // executed when update form is submitted
  const handleOnSubmit = (updatedBook) => {
    putItems(updatedBook, history, `/books/${id}`, `/book/${id}`);
  };
  return (
    <>
      <Update
        title="Create Book"
        isLoading={isLoading}
        form={(
          <BookForm
            isLoading={isLoading}
            authors={authors}
            genres={genres}
            bookObj={book}
            handleOnSubmit={handleOnSubmit}
          />
        )}
      />
    </>
  );
};

export default BookUpdate;
