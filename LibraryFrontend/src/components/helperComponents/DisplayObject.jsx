import {React, useEffect, useState} from 'react';

const DisplayObject = ({additionalKey, object}) => {
  const [newObject, setNewObject] = useState(false);

  // format object at mount
  useEffect(() => {
    const tempObject = {...object};
    const objectKeys = Object.keys(object);
    objectKeys.forEach((value) => {
      if (value === '_id') {
        delete tempObject[value];
      } else if (value === '__v') {
        delete tempObject[value];
      }
    });
    setNewObject(tempObject);
  }, []);

  // sanitize values
  const toDisplay = (value) => {
    if (!isNaN(Date.parse(value))) {
      // if is date
      return new Date(Date.parse(value)).toLocaleString(
        'en-AU',
        {year: 'numeric', month: 'long', day: 'numeric'},
      );
    }
    if (value == null) {
      // if it is undefined or null
      return 'None';
    } if (typeof value === 'string') {
      // if string replace _ with spaces
      return value.replace(/_+/g, ' ');
    }
    return value;
  };

  return (
    <div>
      <ul>
        {
            Object.keys(newObject).map((item, index) => (
              <li key={additionalKey ? (index + additionalKey) : index}>
                {toDisplay(item)}
                &nbsp;:&nbsp;
                {toDisplay(newObject[item])}
              </li>
            ))
          }

      </ul>
    </div>
  );
};

export default DisplayObject;
