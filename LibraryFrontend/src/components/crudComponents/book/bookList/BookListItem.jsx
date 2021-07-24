import React from 'react';

const BookListItem = ({
  id, title, authorName, handleClick,
}) => {
  // executed when book item is pressed
  const onClick = () => {
    handleClick(id);
  };

  return (
    <div role="button" tabIndex={0} style={{cursor: 'pointer'}} onClick={onClick}>
      <h3>{title}</h3>
      <p>
        By&nbsp;
        {authorName}
      </p>
      <hr />
    </div>
  );
};

export default BookListItem;
