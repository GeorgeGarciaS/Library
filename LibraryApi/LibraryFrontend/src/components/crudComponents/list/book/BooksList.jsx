import React from 'react';
import BookListItem from './BookListItem';

const BookList = ({books, handleClick}) => {
  const getFullName = (book) => (
    book.author ? `${book.author.first_name} ${book.author.family_name}` : ''
  );
  return (
    <>
      <div className="inner">
        {Object.keys(books).map((book) => (
          <BookListItem
            key={books[book]._id}
            id={books[book]._id}
            title={books[book].title}
            authorName={getFullName(books[book])}
            handleClick={handleClick}
          />
        ))}

      </div>
    </>
  );
};

export default BookList;
