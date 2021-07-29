import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useParams} from 'react-router-dom';
import GenreForm from '../../forms/author/AuthorForm';
import {fetchItems, putItems} from '../../crudHelperFunctions';
import Update from '../Update';

const AuthorUpdate = ({history}) => {
  const {id} = useParams();
  const [author, setAuthor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // fetch author on mount
  useEffect(() => {
    const getAuthor = async () => {
      const authorFromApi = await fetchItems(`/authors/${id}`, history);
      setAuthor(authorFromApi);
    };
    getAuthor();
  }, []);

  // check if finished fetching
  useEffect(() => {
    if (!_.isEmpty(author)) {
      setIsLoading(false);
    }
  }, [author]);

  // executed when update form is submitted
  const handleOnSubmit = (newAuthor) => {
  // send request to server
    putItems(newAuthor, history, `/authors/${id}`, `/author/${id}`);
  };

  return (
    <>
      <Update
        title="Update Author"
        isLoading={isLoading}
        form={(
          <GenreForm
            AuthorObj={author}
            handleOnSubmit={handleOnSubmit}
          />
        )}
      />

    </>
  );
};
export default AuthorUpdate;
