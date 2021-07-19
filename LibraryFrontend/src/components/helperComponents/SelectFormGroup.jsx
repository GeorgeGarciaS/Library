import React from 'react';
import { Form} from 'react-bootstrap';

const SelectFormGroup = ({
  title, name, value, onChange, error, defaultLabel, optionsObject,
}) => (
  <>
    <Form.Group style={{color: 'black', width: '85vw', margin: '20px auto'}} controlId="genre">
      <Form.Label><b>{title}</b></Form.Label>
      <Form.Control
        className="input-control"
        as="select"
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value={false}>{defaultLabel}</option>
        {Object.keys(optionsObject).map((item) => (
          <option key={optionsObject[item]._id} value={optionsObject[item]._id}>
            {(name === 'genre')
              ? optionsObject[item].name
              : (`${optionsObject[item].first_name} ${optionsObject[item].family_name}`)}
          </option>
        ))}
      </Form.Control>
      <span className="error">{error}</span>
    </Form.Group>
  </>
);

export default SelectFormGroup;
