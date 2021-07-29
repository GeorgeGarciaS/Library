import React from 'react';

const DetailListItem = ({name, info}) => {
  const sanitizeValues = (value) => {
    if (
      typeof value === 'string'
      && value.length === 10
      && new Date(value).toString() !== 'Invalid Date'
    ) {
      // if is date
      return new Date(value).toLocaleString(
        'en-AU',
        {year: 'numeric', month: 'long', day: 'numeric'},
      );
    } if (value == null) {
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
        &nbsp;:&nbsp;
        {sanitizeValues(info)}
      </li>
    </>
  );
};

export default DetailListItem;
