import React, {useState} from 'react';
import TextFormGroup from '../TextFormGroup';
import DateFormGroup from '../DateFormGroup';
import validate from './AuthorValidation';

const AuthorForm = ({
  AuthorObj, handleOnSubmit,
}) => {
  const [errors, setErrors] = useState({});
  // Initial setup if obj is passed
  const [author, setAuthor] = useState(() => ({
    firstName: (AuthorObj) ? AuthorObj.first_name : '',
    familyName: (AuthorObj) ? AuthorObj.family_name : '',
    dateOfBirth: (AuthorObj) ? AuthorObj.date_of_birth : '',
    dateOfDeath: (AuthorObj && AuthorObj.date_of_death) ? AuthorObj.date_of_death : '',
  }));

  // main form validation
  const handleValidation = () => {
    const [err, formIsValid] = validate(author);
    setErrors(err);
    return formIsValid;
  };

  // check for errors only after submit has been pressed
  const onSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      handleOnSubmit({
        first_name: author.firstName,
        family_name: author.familyName,
        date_of_birth: author.dateOfBirth,
        date_of_death: (author.dateOfDeath === '') ? null : author.dateOfDeath,
      });
    }
  };

  // for further development(real time error handling)
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setAuthor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* first name form */}
        <TextFormGroup
          title="First Name"
          name="firstName"
          value={author.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
        />
        {/* family name form */}
        <TextFormGroup
          title="Family Name"
          name="familyName"
          value={author.familyName}
          onChange={handleInputChange}
          error={errors.familyName}
        />

        {/* date of birth */}
        <DateFormGroup
          title="Date of Birth"
          name="dateOfBirth"
          value={author.dateOfBirth}
          onChange={handleInputChange}
          error={errors.dateOfBirth}
        />
        {/* date of death */}
        <DateFormGroup
          title="Date of Death"
          name="dateOfDeath"
          value={author.dateOfDeath}
          onChange={handleInputChange}
          error={errors.dateOfDeath}
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

export default AuthorForm;
