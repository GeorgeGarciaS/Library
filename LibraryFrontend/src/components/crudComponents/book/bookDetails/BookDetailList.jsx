import React from 'react';
import _ from 'lodash';
import BookDetailListItem from './BookDetailListItem';

const BookDetailList = ({bookInfo, child}) => (
  <>
    <ul style={child ? {margin: '0'} : {}}>
      {
        Object.keys(bookInfo).map((item) => (
          (_.isObject(bookInfo[item][1]))
            ? (// info is another object with information, not just text
              <BookDetailListItem
                key={item}
                name={bookInfo[item][0]}
                info={<BookDetailList bookInfo={bookInfo[item][1]} child />}
              />
            )
            : (// info is string
              <BookDetailListItem key={item} name={bookInfo[item][0]} info={bookInfo[item][1]} />
            )

        ))
      }
    </ul>
  </>
);

export default BookDetailList;
