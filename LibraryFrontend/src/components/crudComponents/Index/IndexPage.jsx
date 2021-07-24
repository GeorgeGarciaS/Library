import React, {useState, useEffect} from 'react';
import Intro from './Intro';
import IndexList from './IndexList';
import {fetchItems} from '../helperFunctions';
import Loading from '../../errorHandlingComponents/Loading';

const IndexPage = ({history}) => {
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [itemsDetail, setItemsDetail] = useState({
    author: {name: 'Authors', path: '/authors', count: '0'},
    book: {name: 'Books', path: '/books', count: '0'},
    genre: {name: 'Genres', path: '/genres', count: '0'},
  });

  const getCount = (countPath) => items.data[countPath];

  // fetch index items on mount
  useEffect(() => {
    const getItems = async () => {
      const ItemsFromApi = await fetchItems('http://localhost:8000/', history);
      setItems(ItemsFromApi);
      setIsLoading(false);
    };
    getItems();
  }, []);

  // set item's properties
  useEffect(() => {
    if (!isLoading) {
      setItemsDetail({
      // key: [name, routing path, count]
        author: {...itemsDetail.author, count: getCount('authorCount')},
        book: {...itemsDetail.book, count: getCount('bookCount')},
        genre: {...itemsDetail.genre, count: getCount('genreCount')},
      });
    }
  }, [isLoading]);

  // executed when Item(book, genre, author) is pressed
  const handleClickRerouting = (key) => {
    const routingPath = itemsDetail[key].path;
    history.push({pathname: routingPath});
  };

  return (
    <>
      <Intro linkTo="#IndexList" />
      <section id="IndexList" className="wrapper style3 special">
        <div className="inner">
          <header className="major">
            <h2>See What is in the Current Library</h2>
          </header>
          {(isLoading)
            ? <Loading />
            : (
              <IndexList
                isLoading={isLoading}
                itemsDetail={itemsDetail}
                handleClick={handleClickRerouting}
              />
            )}

        </div>
      </section>
    </>
  );
};

export default IndexPage;
