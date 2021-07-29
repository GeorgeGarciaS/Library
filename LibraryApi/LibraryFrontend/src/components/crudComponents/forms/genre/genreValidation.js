const validate = (genre) => {
  const err = {};
  let formIsValid = true;

  // name
  if (!genre.name) {
    formIsValid = false;
    err.name = 'Cannot be empty';
  }
  if (typeof genre.name !== 'undefined') {
    if (!genre.name.match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      err.name = 'Only letters and spaces';
    }
    if (genre.name.length < 2) {
      formIsValid = false;
      err.name = 'Must be at least two characters';
    }
  }

  return [err, formIsValid];
};

export default validate;
