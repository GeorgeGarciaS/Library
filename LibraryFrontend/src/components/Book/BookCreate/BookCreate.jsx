import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import BookForm from '../../BookForm';
import {fetchItems, postBook} from '../../helperFunctions';
import Loading from '../../../errorHandlingComponents/Loading';

const BookCreate = ({history}) => {
  const [authors, setAuthors] = useState({});
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  // check if finished fetching
  useEffect(() => {
    if (_.isEmpty(authors) || _.isEmpty(genres)) {
      setIsLoading(false);
    }
  }, [authors, genres]);

  // executed when update form is submitted
  const handleOnSubmit = (newBook) => {
    const bookObj = {
      title: newBook.title,
      author: newBook.author,
      summary: newBook.summary,
      isbn: newBook.isbn,
      genre: [newBook.genre],
    };
    // send request to server
    postBook(bookObj, history);
  };

  return (
    <>
      <article id="main">
        <header>
          <h2>Create Book</h2>
        </header>
        <section className="wrapper style5">
          <div className="inner">
            {(isLoading)
              ? <Loading />
              : (
                <BookForm
                  isLoading={isLoading}
                  authors={authors}
                  genres={genres}
                  handleOnSubmit={handleOnSubmit}
                />
              )}

          </div>
        </section>
      </article>
    </>
  );
};
export default BookCreate;
