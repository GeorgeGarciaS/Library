import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import {fetchItems} from '../../crudHelperFunctions';
import DetailPage from '../DetailPage';

const BookDetailPage = ({history}) => {
  const {id} = useParams();
  const [book, setBook] = useState({});
  const [bookInfo, setBookInfo] = useState([]);

  // fetch book on mount
  useEffect(() => {
    const getBook = async () => {
      const bookFromApi = await fetchItems(`/books/${id}`, history);
      setBook(bookFromApi);
    };
    getBook();
  }, []);

  // set book information when fetching has been finished
  useEffect(() => {
    if (!_.isEmpty(book)) {
      setBookInfo({
        // key: [title, information]
        0: ['Title', book.title],
        1: ['Author', {
          0: ['Full Name', `${book.author.first_name} ${book.author.family_name}`],
          1: ['Date of Birth', book.author.date_of_birth],
          2: ['Date of Death', book.author.date_of_death],

        }],
        2: ['ISBN', book.isbn],
        3: ['Genre', book.genre.reduce((result, item, index) => ({// warning, function runs O(n^2)
          ...result,
          [index]: ['Name', item.name],
        }), {})],
        4: ['Summary', book.summary],
      });
    }
  }, [book]);

  const getBookTitle = () => (book.title ? book.title : 'Book Title');

  // executed when delete or edit buttons are pressed
  const handleClickRerouting = (action) => {
    switch (action) {
      case 'Edit':
        history.push({pathname: `/book/edit/${id}`});
        break;
      case 'Delete':
        history.push({pathname: `/book/delete/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  console.log(book);
  return (
    <DetailPage
      title={getBookTitle()}
      itemInfo={bookInfo}
      handleClickRerouting={handleClickRerouting}
    />
  );
};

export default BookDetailPage;
