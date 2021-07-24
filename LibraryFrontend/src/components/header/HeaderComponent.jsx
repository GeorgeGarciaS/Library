import React from 'react';
import Menu from './Menu';
// import {Link} from 'react-router-dom';

export const HeaderComponent = () => (
  <header id="header">
    <h1><a href="index.html">Library</a></h1>
    <nav id="nav">
      <ul>
        <li className="special">
          <a href="#menu" className="menuToggle"><span>Menu</span></a>
          <div id="menu">
            <Menu />
          </div>
        </li>
      </ul>
    </nav>
  </header>
);

export default HeaderComponent;
