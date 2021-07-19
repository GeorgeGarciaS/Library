import React from 'react';

const ButtonComponent = ({text, onClick}) => (
  <>
    <button
      type="button"
      onClick={onClick}
      style={{margin: '3px'}}
      className="btn"
    >
      {text}
    </button>
  </>
);

export default ButtonComponent;
