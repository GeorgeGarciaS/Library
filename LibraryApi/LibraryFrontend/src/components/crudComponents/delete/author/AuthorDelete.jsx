import React from 'react';
import {useParams} from 'react-router-dom';
import {deleteItems} from '../../crudHelperFunctions';
import Delete from '../Delete';

const AuthorDelete = ({history}) => {
  const {id} = useParams();

  // executed when user response is submitted
  const handleClick = (action) => {
    switch (action) {
      case 'Yes':
        // send request to server
        deleteItems(history, `/authors/${id}`, '/author');
        break;
      case 'No':
        // go back to author detail
        history.push({pathname: `/author/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  return (
    <>
      <Delete
        title="Delete Author"
        handleClick={handleClick}
      />
    </>
  );
};

export default AuthorDelete;
