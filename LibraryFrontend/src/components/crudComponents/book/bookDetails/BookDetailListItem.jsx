import React from 'react';

const BookDetailListItem = ({name, info}) => {
  const sanitizeValues = (value) => {
    if (!isNaN(Date.parse(value))) {
      // if is date
      return new Date(Date.parse(value)).toLocaleString(
        'en-AU',
        {year: 'numeric', month: 'long', day: 'numeric'},
      );
    }
    if (value == null) {
      // if it is undefined or null
      return '-';
    } if (typeof value === 'string') {
      // if string replace _ with spaces
      return value.replace(/_+/g, ' ');
    }
    return value;
  };

  return (
    <>
      <li>
        <b>{name}</b>
        {' '}
        :
        {' '}
        {sanitizeValues(info)}
      </li>
    </>
  );
};

export default BookDetailListItem;
