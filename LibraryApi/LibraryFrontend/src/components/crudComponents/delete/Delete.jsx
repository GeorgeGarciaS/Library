import React from 'react';

const Update = ({
  title, handleClick,
}) => (
  <>
    <article id="main">
      <header>
        <h2>{title}</h2>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          <ul className="actions fit small">
            <li>
              <button
                type="button"
                onClick={() => handleClick('Yes')}
                style={{marginRight: '0.3em'}}
                className="btn"
              >
                Yes
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleClick('No')}
                style={{marginRight: '0.3em'}}
                className="btn"
              >
                No
              </button>
            </li>
          </ul>
        </div>
      </section>
    </article>
  </>
);
export default Update;
