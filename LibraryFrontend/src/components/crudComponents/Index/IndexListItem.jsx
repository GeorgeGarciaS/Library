import React from 'react';

const IndexList = ({
  item, name, count, handleClick,
}) => {
  // executed when Item(book, genre, author) is pressed
  const onClick = () => {
    handleClick(item);
  };

  return (
    <>
      <li className="fa fa-user" style={{cursor: 'pointer'}} onClick={onClick}>
        <h3>{name}</h3>
        <h2>{count}</h2>
      </li>
    </>
  );
};

export default IndexList;
