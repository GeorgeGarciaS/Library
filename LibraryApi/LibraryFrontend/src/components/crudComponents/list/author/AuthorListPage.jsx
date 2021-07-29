import React, {useState, useEffect} from 'react';
import {fetchItems} from '../../crudHelperFunctions';
import AuthorList from './AuthorList';
import ListPage from '../ListPage';

const AuthorListPage = ({history}) => {
  const [authors, setAuthors] = useState({});

  // fetch books on mount
  useEffect(() => {
    const getBooks = async () => {
      const authorsFromApi = await fetchItems('/authors', history);
      setAuthors(authorsFromApi ? authorsFromApi.authorList : {});
    };
    getBooks();
  }, []);

  // executed when author list item is pressed
  const handleClickRerouting = (id) => {
    history.push(`/author/${id}`);
  };

  return (
    <>
      <ListPage
        title="List of authors"
        items={authors}
        ListComponent={
          <AuthorList authors={authors} handleClick={handleClickRerouting} />
      }
      />
    </>
  );
};

export default AuthorListPage;
