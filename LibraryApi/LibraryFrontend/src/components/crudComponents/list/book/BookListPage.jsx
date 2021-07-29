import React, {useState, useEffect} from 'react';
import {fetchItems} from '../../crudHelperFunctions';
import BookList from './BooksList';
import ListPage from '../ListPage';

const BookListPage = ({history}) => {
  const [books, setBooks] = useState({});

  // fetch books on mount
  useEffect(() => {
    const getBooks = async () => {
      const booksFromApi = await fetchItems('/books', history);
      setBooks(booksFromApi ? booksFromApi.bookList : {});
    };
    getBooks();
  }, []);

  // executed when book list item is pressed
  const handleClickRerouting = (id) => {
    history.push(`/book/${id}`);
  };

  return (
    <>
      <ListPage
        title="List of books"
        items={books}
        ListComponent={
          <BookList books={books} handleClick={handleClickRerouting} />
      }
      />
    </>
  );
};

export default BookListPage;
