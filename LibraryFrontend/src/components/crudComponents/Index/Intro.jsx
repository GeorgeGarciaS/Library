import React from 'react';

const Intro = ({linkTo}) => (
  <>
    <section id="banner">
      <div className="inner">
        <h2>Library</h2>
        <ul className="actions special">
          <li><a href="#" className="button primary">Github</a></li>
          <li><a href="#" className="button primary">LinkedIn</a></li>
        </ul>
      </div>
      <a href={linkTo} className="more scrolly">See Details</a>
    </section>
  </>
);

export default Intro;
