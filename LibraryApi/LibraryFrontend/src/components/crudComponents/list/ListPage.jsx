import React, {useState, useEffect} from 'react';
import Loading from '../../errorHandlingComponents/Loading';

const BookListPage = ({title, items, ListComponent}) => {
  const [isLoading, setIsLoading] = useState(true);

  // check if items finished fetching
  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items]);
  return (
    <article id="main">
      <header>
        <h2>{title}</h2>
      </header>
      <section className="wrapper style5">
        <div className="inner">
          {(isLoading)
            ? <Loading />
            : (
              ListComponent
            )}

        </div>
      </section>
    </article>
  );
};

export default BookListPage;
