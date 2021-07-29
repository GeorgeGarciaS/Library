import React from 'react';
import GenreForm from '../../forms/author/AuthorForm';
import {postItems} from '../../crudHelperFunctions';
import Create from '../Create';

const AuthorCreate = ({history}) => {
  // executed when create form is submitted
  const handleOnSubmit = (newAuthor) => {
  // send request to server
    postItems(newAuthor, history, '/authors', '/author');
  };

  return (
    <>
      <Create
        title="Create Book"
        form={(
          <GenreForm
            handleOnSubmit={handleOnSubmit}
          />
        )}
      />

    </>
  );
};
export default AuthorCreate;
