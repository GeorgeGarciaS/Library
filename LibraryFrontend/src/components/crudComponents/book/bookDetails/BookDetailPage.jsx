import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {fetchItems} from '../../helperFunctions';
import BookDetail from './BookDetail';
import Loading from '../../../errorHandlingComponents/Loading';

const BookDetailPage = ({history}) => {
  const {id} = useParams();
  const [book, setBook] = useState({});
  const [bookInfo, setBookInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // fetch book on mount
  useEffect(() => {
    const getBook = async () => {
      const bookFromApi = await fetchItems(`http://localhost:8000/books/${id}`, history);
      setBook(bookFromApi);
      setIsLoading(false);
    };
    getBook();
  }, []);

  // set book information when fetching has been finished
  useEffect(() => {
    if (!isLoading) {
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
  }, [isLoading]);

  const getBookTitle = () => (book.title ? book.title : 'Book title');

  // executed when delete or edit buttons are pressed
  const handleClickRerouting = (action) => {
    switch (action) {
      case 'Edit':
        history.push({pathname: `/books/edit/${id}`});
        break;
      case 'Delete':
        history.push({pathname: `/books/delete/${id}`});
        break;
      default:
        history.push({pathname: '/'});
    }
  };
  return (
    <article id="main">
      <header>
        <h2>{getBookTitle()}</h2>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          {(isLoading)
            ? <Loading />
            : (
              <BookDetail
                id={id}
                isLoading={isLoading}
                bookInfo={bookInfo}
                handleClick={handleClickRerouting}
              />
            )}

        </div>
      </section>
    </article>
  );
};

export default BookDetailPage;
