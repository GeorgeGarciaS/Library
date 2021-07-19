import React from 'react';
import { Form} from 'react-bootstrap';

const TextFormGroup = ({
  title, name, value, onChange, error,
}) => (
  <>
    <Form.Group style={{color: 'black', width: '85vw', margin: '20px auto'}} controlId="isbn">
      <Form.Label><b>{title}</b></Form.Label>
      <Form.Control
        className="input-control"
        type="text"
        name={name}
        value={value}
        placeholder={`Enter ${name}`}
        onChange={onChange}
      />
      <span className="error">{error}</span>
    </Form.Group>
  </>
);

export default TextFormGroup;
