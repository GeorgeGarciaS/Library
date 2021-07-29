import React from 'react';
import IndexListItem from './IndexListItem';

const IndexList = ({
  itemsDetail, handleClick,
}) => (
  <>
    <ul className="features">
      {Object.keys(itemsDetail).map((key) => (
        <IndexListItem
          key={key}
          item={key}
          name={itemsDetail[key].name}
          count={itemsDetail[key].count}
          handleClick={handleClick}
        />
      ))}

    </ul>
  </>
);

export default IndexList;
