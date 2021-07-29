import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import BookForm from '../../forms/book/BookForm';
import {fetchItems, postItems} from '../../crudHelperFunctions';
import Create from '../Create';

const BookCreate = ({history}) => {
  const [authors, setAuthors] = useState({});
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // fetch genres on mount
  useEffect(() => {
    const getGenres = async () => {
      const genresFromApi = await fetchItems('/genres', history);
      setGenres(genresFromApi ? genresFromApi.genreList : {});
    };
    getGenres();
  }, []);

  // fetch authors on mount
  useEffect(() => {
    const getAuthors = async () => {
      const authorsFromApi = await fetchItems('/authors', history);
      setAuthors(authorsFromApi ? authorsFromApi.authorList : {});
    };
    getAuthors();
  }, []);

  // check if finished fetching
  useEffect(() => {
    if (_.isEmpty(authors) || _.isEmpty(genres)) {
      setIsLoading(false);
    }
  }, [authors, genres]);

  // executed when create form is submitted
  const handleOnSubmit = (newBook) => {
    // send request to server
    postItems(newBook, history, '/books', '/book');
  };

  return (
    <>
      <Create
        title="Create Book"
        isLoading={isLoading}
        form={(
          <BookForm
            authors={authors}
            genres={genres}
            handleOnSubmit={handleOnSubmit}
          />
        )}
      />

    </>
  );
};
export default BookCreate;
