import React from 'react';

const SelectFormGroup = ({
  title, name, value, onChange, error, defaultLabel, optionsObject,
}) => (
  <>
    <div style={{margin: '2em'}}>
      <span><b>{title}</b></span>
      <select name={name} value={value} onChange={onChange}>
        {/* create options */}
        <option value="">{defaultLabel}</option>
        {Object.keys(optionsObject).map((item) => (
          <option key={optionsObject[item]._id} value={optionsObject[item]._id}>
            {(name !== 'author')
              ? optionsObject[item].name
              : (`${optionsObject[item].first_name} ${optionsObject[item].family_name}`)}
          </option>
        ))}
      </select>
      <span className="error">{error}</span>
    </div>
  </>
);

export default SelectFormGroup;
