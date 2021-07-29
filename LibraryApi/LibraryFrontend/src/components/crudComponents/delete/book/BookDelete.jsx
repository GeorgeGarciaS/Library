import React from 'react';
import {useParams} from 'react-router-dom';
import {deleteItems} from '../../crudHelperFunctions';
import Delete from '../Delete';

const BookDelete = ({history}) => {
  const {id} = useParams();

  // executed when user response is submitted
  const handleClick = (action) => {
    switch (action) {
      case 'Yes':
        // send request to server
        deleteItems(history, `/books/${id}`, '/book');
        break;
      case 'No':
        // go back to book detail
        history.push({pathname: `/book/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  return (
    <>
      <Delete
        title="Delete Book"
        handleClick={handleClick}
      />
    </>
  );
};

export default BookDelete;
