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
      <Link to="/author/create">
        Create Author
      </Link>
    </li>
    <li>
      <Link to="/book/create">
        Create Book
      </Link>
    </li>
    <li>
      <Link to="/genre/create">
        Create Genre
      </Link>
    </li>
  </ul>
);

export default Menu;
