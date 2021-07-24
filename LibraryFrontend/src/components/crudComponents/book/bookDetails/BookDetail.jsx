import React from 'react';

import BookDetailList from './BookDetailList';

const BookDetail = ({bookInfo, handleClick}) => (
  <>
    <div>
      <div>
        <BookDetailList bookInfo={bookInfo} />
      </div>
      <button
        type="button"
        onClick={() => handleClick('Edit')}
        style={{marginRight: '0.3em'}}
        className="btn"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => handleClick('Delete')}
        style={{marginRight: '0.3em'}}
        className="btn"
      >
        Delete
      </button>
    </div>
  </>
);

export default BookDetail;
