import React, {useState, useEffect} from 'react';
import Intro from './Intro';
import IndexList from './IndexList';
import {fetchItems} from '../crudHelperFunctions';
import Loading from '../../errorHandlingComponents/Loading';

const IndexPage = ({history}) => {
  const [items, setItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // setup main object that contains information about actions and detail for fetched items
  const [itemsDetail, setItemsDetail] = useState({
    author: {name: 'Authors', path: '/author', count: '0'},
    book: {name: 'Books', path: '/book', count: '0'},
    genre: {name: 'Genres', path: '/genre', count: '0'},
  });

  const getCount = (countPath) => items.data[countPath];

  // fetch index items on mount
  useEffect(() => {
    const getItems = async () => {
      const ItemsFromApi = await fetchItems('/index', history);
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
