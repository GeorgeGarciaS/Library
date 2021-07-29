import React from 'react';
import Menu from './Menu';

export const HeaderComponent = ({history}) => (
  <header id="header">
    <h1><a href="index.html">Library</a></h1>
    <nav id="nav">
      <ul>
        <li className="special">
          <a href="#menu" className="menuToggle"><span>Menu</span></a>
          <div id="menu">
            <Menu history={history} />
          </div>
        </li>
      </ul>
    </nav>
  </header>
);

export default HeaderComponent;
