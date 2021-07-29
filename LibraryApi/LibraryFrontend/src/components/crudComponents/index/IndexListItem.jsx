import React from 'react';

const IndexList = ({
  item, name, count, handleClick,
}) => {
  // executed when Item(book, genre, author) is pressed
  const onClick = () => {
    handleClick(item);
  };

  const getIcon = () => {
    switch (name) {
      case 'Authors':
        return 'fa fa-user';
      case 'Books':
        return 'fa fa-book';
      case 'Genres':
        return 'fa fa-bars';
      default:
        return 'fa fa-hamburger';
    }
  };

  return (
    <>
      <li className={getIcon()} style={{cursor: 'pointer'}} onClick={onClick}>
        <h3>{name}</h3>
        <h2>{count}</h2>
      </li>
    </>
  );
};

export default IndexList;
