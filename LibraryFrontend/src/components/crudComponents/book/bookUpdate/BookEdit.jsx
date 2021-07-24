import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import BookForm from '../forms/BookForm';
import Loading from '../../../errorHandlingComponents/Loading';
import {fetchItems, putBook} from '../../helperFunctions';

const BookEdit = ({history}) => {
  const { id } = useParams();
  const [authors, setAuthors] = useState({});
  const [book, setBook] = useState({});
  const [genres, setGenres] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  // check if finished fetching
  useEffect(() => {
    if (!_.isEmpty(authors) && !_.isEmpty(genres) && !_.isEmpty(book)) {
      console.log(book);
      setIsLoading(false);
    }
  }, [authors, genres, book]);

  // executed when update form is submitted
  const handleOnSubmit = (updatedBook) => {
    const bookObj = {
      title: updatedBook.title,
      author: updatedBook.author,
      summary: updatedBook.summary,
      isbn: updatedBook.isbn,
      genre: [updatedBook.genre],
    };

    putBook(id, bookObj, history);
  };
  console.log(isLoading, book);
  return (
    <>
      <article id="main">
        <header>
          <h2>Update Book</h2>
        </header>
        <section className="wrapper style5">
          <div className="inner">
            {(isLoading)
              ? <Loading />
              : (
                <BookForm
                  bookObj={book}
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

export default BookEdit;
