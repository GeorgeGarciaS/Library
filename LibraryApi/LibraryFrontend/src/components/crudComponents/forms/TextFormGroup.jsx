import React from 'react';

const TextFormGroup = ({
  title, name, value, onChange, error,
}) => (
  <>
    <div style={{margin: '2em'}}>
      <span><b>{title}</b></span>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={`Enter ${name}`}
        onChange={onChange}
      />
      <span className="error">{error}</span>
    </div>
  </>
);

export default TextFormGroup;
