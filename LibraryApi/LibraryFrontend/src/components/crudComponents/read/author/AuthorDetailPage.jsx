import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import {fetchItems} from '../../crudHelperFunctions';
import DetailPage from '../DetailPage';

const AuthorDetailPage = ({history}) => {
  const {id} = useParams();
  const [author, setAuthor] = useState({});
  const [AuthorInfo, setAuthorInfo] = useState([]);

  // fetch author on mount
  useEffect(() => {
    const getAuthor = async () => {
      const authorFromApi = await fetchItems(`/authors/${id}`, history);
      setAuthor(authorFromApi);
    };
    getAuthor();
  }, []);

  // set author information when fetching has been finished
  useEffect(() => {
    if (!_.isEmpty(author)) {
      setAuthorInfo({
        // key: [title, information]
        0: ['First Name', author.first_name],
        1: ['Family Name', author.family_name],
        2: ['Date of Birth', author.date_of_birth],
        3: ['Date of Death', author.date_of_death],
        6: ['Books', author.books.reduce((result, item, index) => ({// warning, function runs O(n^2)
          ...result,
          [index]: ['Title', item.title],
        }), {})],
      });
    }
  }, [author]);

  const getAuthorName = () => (
    author.first_name ? `${author.first_name} ${author.family_name}` : 'Author Name'
  );

  // executed when delete or edit buttons are pressed
  const handleClickRerouting = (action) => {
    switch (action) {
      case 'Edit':
        history.push({pathname: `/author/edit/${id}`});
        break;
      case 'Delete':
        history.push({pathname: `/author/delete/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  return (
    <DetailPage
      title={getAuthorName()}
      itemInfo={AuthorInfo}
      handleClickRerouting={handleClickRerouting}
    />
  );
};

export default AuthorDetailPage;
