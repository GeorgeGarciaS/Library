import React, {useState, useEffect} from 'react';
import {fetchItems} from '../../helperFunctions';
import BookList from './BooksList';
import Loading from '../../../errorHandlingComponents/Loading';

const BookListPage = ({history}) => {
  const [books, setBooks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // fetch books on mount
  useEffect(() => {
    const getBooks = async () => {
      const booksFromApi = await fetchItems('http://localhost:8000/books', history);
      setBooks(booksFromApi.bookList);
      setIsLoading(false);
    };
    getBooks();
  }, []);

  // executed when book item is pressed
  const handleClickRerouting = (id) => {
    history.push(`/books/${id}`);
  };

  return (
    <article id="main">
      <header>
        <h2>List of Books</h2>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          {(isLoading)
            ? <Loading />
            : (
              <BookList isLoading={isLoading} books={books} handleClick={handleClickRerouting} />
            )}

        </div>
      </section>
    </article>
  );
};

export default BookListPage;
