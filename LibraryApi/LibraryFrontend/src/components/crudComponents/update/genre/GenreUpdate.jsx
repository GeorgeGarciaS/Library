import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {useParams} from 'react-router-dom';
import GenreForm from '../../forms/genre/GenreForm';
import {fetchItems, putItems} from '../../crudHelperFunctions';
import Update from '../Update';

const GenreUpdate = ({history}) => {
  const {id} = useParams();
  const [genre, setGenre] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // fetch genre on mount
  useEffect(() => {
    const getGenre = async () => {
      const genreFromApi = await fetchItems(`/genres/${id}`, history);
      setGenre(genreFromApi);
    };
    getGenre();
  }, []);

  // check if finished fetching
  useEffect(() => {
    if (!_.isEmpty(genre)) {
      setIsLoading(false);
    }
  }, [genre]);

  // executed when update form is submitted
  const handleOnSubmit = (newGenre) => {
  // send request to server
    putItems(newGenre, history, `/genres/${id}`, `/genre/${id}`);
  };

  return (
    <>
      <Update
        title="Update Genre"
        isLoading={isLoading}
        form={(
          <GenreForm
            GenreObj={genre}
            handleOnSubmit={handleOnSubmit}
          />
        )}
      />

    </>
  );
};
export default GenreUpdate;
