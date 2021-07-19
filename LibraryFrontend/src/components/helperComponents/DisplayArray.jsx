import React from 'react';
import DisplayObject from './DisplayObject';

const DisplayArray = ({array}) => (
  <div>
    <ul>
      {
        array.map((value) => (
          <DisplayObject key={value} object={value} />
        ))
      }
    </ul>
  </div>
);

export default DisplayArray;
