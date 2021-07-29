import _ from 'lodash';

import React from 'react';

const Errors = ({location}) => (
  <>
    <article id="main">
      <header>
        <h2>Errors</h2>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          {!_.isEmpty(location.state) ? (
            <ul>
              {// get errors from server and display them
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
      </section>
    </article>
  </>
);

export default Errors;
