import {React, useEffect, useState} from 'react';
import {Card} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import DisplayValue from '../helperComponents/DisplayValue';
import ButtonComponent from '../helperComponents/ButtonComponent';
import Loading from '../errorHandlingComponents/Loading';
import {fetchItems} from './helperFunctions';

const Book = ({history}) => {
  const {id} = useParams();
  const [book, setBook] = useState(false);

  // fetch book on mount
  useEffect(() => {
    const getBook = async () => {
      const bookFromApi = await fetchItems(`http://localhost:8000/books/${id}`, history);
      setBook(bookFromApi);
    };
    getBook();
  }, []);

  return (
    <>
      {(_.isEmpty(book))
        ? <Loading />
        : (
          <Card className="book">
            <Card.Body>
              <Card.Title className="book-title" />
              <div>
                <ul>
                  {
                Object.keys(book).map((item) => (
                  <li key={item}>
                    <b>{item}</b>
                    {' '}
                    :
                    <DisplayValue value={book[item]} />
                  </li>
                ))
              }

                </ul>
              </div>
              <ButtonComponent
                onClick={() => history.push({ pathname: `/books/edit/${id}`})}
                text="Edit"
              />
              <ButtonComponent
                onClick={() => history.push({ pathname: `/books/delete/${id}`})}
                text="Delete"
              />
              <ButtonComponent
                onClick={() => history.push({ pathname: '/books/create'})}
                text="Create"
              />
            </Card.Body>
          </Card>
        )}
    </>
  );
};

export default Book;
