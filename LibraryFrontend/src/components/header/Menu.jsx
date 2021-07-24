import React from 'react';
import {Link} from 'react-router-dom';

export const Menu = () => (
  <ul>
    <li>
      <Link to="/">
        Home
      </Link>
    </li>
    <li>
      <Link to="/authors/create" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Create Author
      </Link>
    </li>
    <li>
      <Link to="/books/create" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Create Book
      </Link>
    </li>
    <li>
      <Link to="/genres/create" className="w3-quarter w3-section w3-xlarge w3-bar-item w3-button">
        Create Genre
      </Link>
    </li>
  </ul>
);

export default Menu;
