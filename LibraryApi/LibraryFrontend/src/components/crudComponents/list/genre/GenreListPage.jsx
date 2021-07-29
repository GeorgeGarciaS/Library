import React, {useState, useEffect} from 'react';
import {fetchItems} from '../../crudHelperFunctions';
import GenreList from './GenreList';
import ListPage from '../ListPage';

const GenreListPage = ({history}) => {
  const [genres, setGenres] = useState({});

  // fetch genres on mount
  useEffect(() => {
    const getBooks = async () => {
      const genreFromApi = await fetchItems('/genres', history);
      setGenres(genreFromApi ? genreFromApi.genreList : {});
    };
    getBooks();
  }, []);

  // executed when genre list item is pressed
  const handleClickRerouting = (id) => {
    history.push(`/genre/${id}`);
  };

  return (
    <>
      <ListPage
        title="List of genres"
        items={genres}
        ListComponent={
          <GenreList genres={genres} handleClick={handleClickRerouting} />
      }
      />
    </>
  );
};

export default GenreListPage;
