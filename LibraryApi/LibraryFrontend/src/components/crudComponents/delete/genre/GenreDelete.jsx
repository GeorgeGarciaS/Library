import React from 'react';
import {useParams} from 'react-router-dom';
import {deleteItems} from '../../crudHelperFunctions';
import Delete from '../Delete';

const GenreDelete = ({history}) => {
  const {id} = useParams();

  // executed when user response is submitted
  const handleClick = (action) => {
    switch (action) {
      case 'Yes':
        // send request to server
        deleteItems(history, `/genres/${id}`, '/genre');
        break;
      case 'No':
        // go back to genre detail
        history.push({pathname: `/genre/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  return (
    <>
      <Delete
        title="Delete Genre"
        handleClick={handleClick}
      />
    </>
  );
};

export default GenreDelete;
