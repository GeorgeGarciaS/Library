import React, {useState} from 'react';

import TextFormGroup from '../TextFormGroup';
import validate from './genreValidation';

const GenreForm = ({
  GenreObj, handleOnSubmit,
}) => {
  const [errors, setErrors] = useState({});
  // Initial setup if obj is passed
  const [genre, setGenre] = useState(() => ({
    name: (GenreObj) ? GenreObj.name : '',
  }));

  // main form validation
  const handleValidation = () => {
    const [err, formIsValid] = validate(genre);
    setErrors(err);
    return formIsValid;
  };

  // check for errors only after submit has been pressed
  const onSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      handleOnSubmit({
        name: genre.name,
      });
    }
  };

  // for further development(real time error handling)
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setGenre((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* name form */}
        <TextFormGroup
          title="Genre Name"
          name="name"
          value={genre.name}
          onChange={handleInputChange}
          error={errors.name}
        />
        <button
          variant="primary"
          type="submit"
          className="submit-btn"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default GenreForm;
