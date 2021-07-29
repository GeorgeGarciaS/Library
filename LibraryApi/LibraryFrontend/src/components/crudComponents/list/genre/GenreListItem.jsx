import React from 'react';

const GenreListItem = ({
  id, genreName, handleClick,
}) => {
  // executed when genre list item is pressed
  const onClick = () => {
    handleClick(id);
  };

  return (
    <div role="button" tabIndex={0} style={{cursor: 'pointer'}} onClick={onClick}>
      <h3>{genreName}</h3>
      <hr />
    </div>
  );
};

export default GenreListItem;
