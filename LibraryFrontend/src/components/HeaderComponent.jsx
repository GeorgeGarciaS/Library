import React from 'react';
import {Link} from 'react-router-dom';

export const HeaderComponent = () => (
  <header className="w3-container w3-padding-32 w3-center w3-black">
    <h1 className="w3-jumbo">Library App</h1>
    <hr />
    <div className="w3-row w3-center w3-padding-16 w3-section w3-light-grey">
      <Link to="/" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Home
      </Link>
      <Link to="/authors" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Authors
      </Link>
      <Link to="/books" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Books
      </Link>
      <Link to="/genres" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Genres
      </Link>

    </div>
  </header>
);

export default HeaderComponent;
