import React from 'react';
import GenreForm from '../../forms/genre/GenreForm';
import {postItems} from '../../crudHelperFunctions';
import Create from '../Create';

const GenreCreate = ({history}) => {
  // executed when create form is submitted
  const handleOnSubmit = (newGenre) => {
    // send request to server
    postItems(newGenre, history, '/genres', '/genre');
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
export default GenreCreate;
