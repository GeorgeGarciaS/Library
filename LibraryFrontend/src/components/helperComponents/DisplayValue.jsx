import React from 'react';
import _ from 'lodash';
import DisplayObject from './DisplayObject';
import DisplayArray from './DisplayArray';

// routing component
const DisplayValue = ({value}) => {
  if (_.isArray(value)) {
    return <DisplayArray array={value} />;
  } if (_.isObject(value)) {
    return <DisplayObject object={value} />;
  }
  return <span>{value}</span>;
};

export default DisplayValue;
