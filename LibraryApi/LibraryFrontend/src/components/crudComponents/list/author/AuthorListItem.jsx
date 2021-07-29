import React from 'react';

const AuthorListItem = ({
  id, authorName, dateOfBirth, dateOfDeath, handleClick,
}) => {
  // executed when author list item is pressed
  const onClick = () => {
    handleClick(id);
  };

  return (
    <div role="button" tabIndex={0} style={{cursor: 'pointer'}} onClick={onClick}>
      <h3>{authorName}</h3>
      <p>
        {dateOfBirth}
        &nbsp;-&nbsp;
        {dateOfDeath}
      </p>
      <hr />
    </div>
  );
};

export default AuthorListItem;
