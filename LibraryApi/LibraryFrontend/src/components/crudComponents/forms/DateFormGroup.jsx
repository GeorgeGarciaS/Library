import React from 'react';

const DateFormGroup = ({
  title, name, value, onChange, error,
}) => (
  <>
    <div style={{margin: '2em'}}>
      <span><b>{title}</b></span>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className="error">{error}</span>
    </div>
  </>
);

export default DateFormGroup;
