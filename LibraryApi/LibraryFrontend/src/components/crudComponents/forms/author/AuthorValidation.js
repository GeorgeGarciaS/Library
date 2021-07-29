const validate = (author) => {
  const err = {};
  let formIsValid = true;

  // first name
  if (!author.firstName) {
    formIsValid = false;
    err.firstName = 'Cannot be empty';
  }

  if (typeof author.firstName !== 'undefined') {
    if (!author.firstName.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      err.firstName = 'Only letters and spaces';
    }
    if (author.firstName.length < 2) {
      formIsValid = false;
      err.firstName = 'Must be at least two characters';
    }
  }
  // family name
  if (!author.familyName) {
    formIsValid = false;
    err.familyName = 'Cannot be empty';
  }

  if (typeof author.familyName !== 'undefined') {
    if (!author.familyName.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      err.familyName = 'Only letters and spaces';
    }
    if (author.familyName.length < 2) {
      formIsValid = false;
      err.familyName = 'Must be at least two characters';
    }
  }
  // date of birth
  if (author.dateOfBirth === '') {
    formIsValid = false;
    err.dateOfBirth = 'Cannot be empty';
  }
  if (author.dateOfBirth != null) {
    if (new Date(author.dateOfBirth) > new Date()) {
      formIsValid = false;
      err.dateOfBirth = 'Date can not be greater than today';
    }
    if (author.dateOfDeath != null && new Date(author.dateOfBirth) > new Date(author.dateOfDeath)) {
      formIsValid = false;
      err.dateOfBirth = 'Date of birth has to be lower than Date of death';
    }
  }
  // date of death
  if (author.dateOfDeath != null) {
    if (new Date(author.dateOfDeath) > new Date()) {
      formIsValid = false;
      err.dateOfDeath = 'Date can not be greater than today';
    }
  }

  return [err, formIsValid];
};

export default validate;
