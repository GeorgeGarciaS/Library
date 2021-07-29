import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import {fetchItems} from '../../crudHelperFunctions';
import DetailPage from '../DetailPage';

const GenreDetailPage = ({history}) => {
  const {id} = useParams();
  const [genre, setGenre] = useState({});
  const [genreInfo, setGenreInfo] = useState([]);

  // fetch genre on mount
  useEffect(() => {
    const getGenre = async () => {
      const genreFromApi = await fetchItems(`/genres/${id}`, history);
      setGenre(genreFromApi);
    };
    getGenre();
  }, []);

  // set genre information when fetching has been finished
  useEffect(() => {
    if (!_.isEmpty(genre)) {
      setGenreInfo({
        // key: [title, information]
        0: ['Name', genre.name],
        1: ['Books', genre.books.reduce((result, item, index) => ({// warning, function runs O(n^2)
          ...result,
          [index]: ['Title', item.title],
        }), {})],
      });
    }
  }, [genre]);

  const getGenreTitle = () => (genre.name ? genre.name : 'Genre Name');

  // executed when delete or edit buttons are pressed
  const handleClickRerouting = (action) => {
    switch (action) {
      case 'Edit':
        history.push({pathname: `/genre/edit/${id}`});
        break;
      case 'Delete':
        history.push({pathname: `/genre/delete/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  return (
    <DetailPage
      title={getGenreTitle()}
      itemInfo={genreInfo}
      handleClickRerouting={handleClickRerouting}
    />
  );
};

export default GenreDetailPage;
