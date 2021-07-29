import React from 'react';
import Loading from '../../errorHandlingComponents/Loading';

const Create = ({
  title, isLoading, form,
}) => (
  <>
    <article id="main">
      <header>
        <h2>{title}</h2>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          {(isLoading)
            ? <Loading />
            : (
              form
            )}

        </div>
      </section>
    </article>
  </>
);
export default Create;
