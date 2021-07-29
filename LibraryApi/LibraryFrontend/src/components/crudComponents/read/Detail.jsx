import React from 'react';

import DetailList from './DetailList';

const Detail = ({itemInfo, handleClick}) => (
  <>
    <div>
      <div>
        <DetailList itemInfo={itemInfo} />
      </div>
      <button
        type="button"
        onClick={() => handleClick('Edit')}
        style={{marginRight: '0.3em'}}
        className="btn"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => handleClick('Delete')}
        style={{marginRight: '0.3em'}}
        className="btn"
      >
        Delete
      </button>
    </div>
  </>
);

export default Detail;
