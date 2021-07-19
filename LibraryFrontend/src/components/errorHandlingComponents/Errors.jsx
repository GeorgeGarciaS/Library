import _ from 'lodash';

import React from 'react';

const Errors = ({location}) => (
  <>
    <div className="w3-ul w3-white w3-center w3-opacity">
      {!_.isEmpty(location.state) ? (
        <ul>
          {
            Object.keys(location.state).map((item) => (
              <li className="w3-dark-grey w3-xlarge w3-padding-32" key={item}>
                {item}
                &nbsp;:&nbsp;
                {location.state[item]}
              </li>
            ))
          }

        </ul>
      ) : (
        <p className="message">Could not identify the error.</p>
      )}
    </div>
  </>
);

export default Errors;
