import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import Detail from './Detail';
import Loading from '../../errorHandlingComponents/Loading';

const DetailPage = ({title, itemInfo, handleClickRerouting}) => {
  const [isLoading, setIsLoading] = useState(true);

  // check if items finished fetching
  useEffect(() => {
    if (!_.isEmpty(itemInfo)) {
      setIsLoading(false);
    }
  }, [itemInfo]);

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
              <Detail
                itemInfo={itemInfo}
                handleClick={handleClickRerouting}
              />
            )}

        </div>
      </section>
    </article>
  );
};

export default DetailPage;
