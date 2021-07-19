import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import Loading from '../errorHandlingComponents/Loading';
import {listStyleNotClickable, divStyle, messageStyle} from '../../ClassNames';
import {fetchItems} from './helperFunctions';

const IndexList = ({history}) => {
  const [items, setItems] = useState({});

  // fetch index items on mount
  useEffect(() => {
    const getItems = async () => {
      const ItemsFromApi = await fetchItems('http://localhost:8000/', history);
      setItems(ItemsFromApi);
    };
    getItems();
  }, []);

  return (
    <>
      {(_.isEmpty(items))
        ? <Loading />
        : (
          <div className={divStyle}>
            {(items.length !== 0)
              ? (
                <ul>
                  {Object.keys(items.data).map((item) => (
                    <li className={listStyleNotClickable} key={item}>
                      {item}
                      &nbsp;:&nbsp;
                      {items.data[item]}
                    </li>
                  ))}

                </ul>
              ) : (
                <p className={messageStyle}>
                  No Items available. Please add some books, authors or genres.
                </p>
              )}
          </div>
        )}
    </>
  );
};

export default IndexList;
