import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {listStyle, divStyle, messageStyle} from '../../ClassNames';
import {fetchItems} from './helperFunctions';
import Loading from '../errorHandlingComponents/Loading';

const BookList = ({history}) => {
  console.log('fgsdfgsdfgsdfg');
  const [books, setBooks] = useState({});

  // fetch items on mount
  useEffect(() => {
    const getBooks = async () => {
      const booksFromApi = await fetchItems('http://localhost:8000/books', history);
      setBooks(booksFromApi.bookList);
    };
    getBooks();
  }, []);

  // call to display complete information of book
  const toggleBookList = (book) => {
    history.push(`/books/${book._id}`);
  };

  const getAuthorName = (book) => (
    book.author
      ? `${book.author.first_name} ${book.author.family_name}` : ''
  );

  console.log(books);
  return (
    <>
      {(_.isEmpty(books))
        ? <Loading />
        : (
          <div className={divStyle}>
            {(books.length !== 0) ? (
              <ul>
                {Object.keys(books).map((book) => (
                  <li className={listStyle} key={book} onClick={() => toggleBookList(books[book])}>
                    {books[book].title}
                    &nbsp;By&nbsp;
                    {getAuthorName(books[book])}
                  </li>
                ))}

              </ul>
            ) : (
              <p className={messageStyle}>
                No Items available. Please add some books, authors or genres.
              </p>
            )}
          </div>
        )}
    </>
  );
};

export default BookList;
