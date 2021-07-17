const {body, validationResult} = require('express-validator');

exports.validationRules = () => [// validation chain
  // Validate and sanitize fields.
  body('title')
    // Sanitization //
    .trim().escape().toLowerCase()
    // custom sanitizer to replace multiple spaces for one space
    .customSanitizer((value) => value.replace(/\s\s+/g, ' '))
    // custom sanitizer to capitalize first letters of first and middle name
    .customSanitizer((value) => value.replace(
      /(?:^|\s)\S/g,
      (a) => a.toUpperCase(),
    ))
    // Validation //
    // check not empty
    .not()
    .isEmpty()
    .withMessage('Title must be specified.')
    .bail()
    // check minimum length
    .isLength({min: 2})
    .withMessage('Title must be longer than two characters.')
    .bail()
    // custom validator to check for not alphanumeric
    .custom((value) => /^[a-zA-Z0-9 ]*$/.test(value))
    .withMessage('Title must only have alphanumeric characters and spaces.'),

  body('author')
    // Sanitization //
    .trim().escape()
    // Validation //
    // check not empty
    .not()
    .isEmpty()
    .withMessage('Author must be specified.')
    .bail()
    // check minimum length
    .isLength({ min: 24, max: 24 })
    .withMessage('Author must be an ID and be 24 characters.')
    .bail()
    // check for not alphanumeric
    // custom validator to check for not alphanumeric
    .custom((value) => /^[a-zA-Z0-9]*$/.test(value))
    .withMessage('Author ID must only contain alphanumeric characters.'),

  body('summary')
    // Sanitization //
    .trim().escape()
    // custom sanitizer to replace multiple spaces for one space
    .customSanitizer((value) => value.replace(/\s\s+/g, ' '))
    // Validation //
    // check not empty
    .not()
    .isEmpty()
    .withMessage('Summary must be specified.')
    .bail()
    // check minimum length
    .isLength({min: 10})
    .withMessage('Summary must be at least 10 characters.')
    .bail()
    // custom validator to check for not alphanumeric
    .custom((value) => /^[a-zA-Z0-9. ]*$/.test(value))
    .withMessage('Summary must  only have alphanumeric characters, periods and spaces.'),

  body('isbn')
    // Sanitization //
    .trim().escape()
    // Validation //
    // check not empty
    .not()
    .isEmpty()
    .withMessage('Isbn must be specified.')
    .bail()
    // check minimum length
    .isLength({min: 2})
    .withMessage('First name must be longer than two characters.')
    .bail()
    // custom validator to check for not alphanumeric
    .custom((value) => /^[a-zA-Z0-9_]*$/.test(value))
    .withMessage('Isbn must only have alphanumeric characters or _.'),

  body('genre')
    // Validation //
    // custom validator to check for list
    .custom((value) => (Array.isArray(value)))
    .withMessage('Genre input should be an array and should have at least one value.')
    .bail()
    // custom validator to check for only strings inside array
    .custom((values) => {
      let valid = true;
      values.forEach((value) => {
        if (typeof value !== 'string') {
          valid = false;
        }
        if (!(/^[0-9a-fA-F]$/.test(value))) {
          valid = false;
        }
      });
      return valid;
    })
    .withMessage('Genre IDs can only be a string contain hexadecimal characters')
    .bail()
    // custom validator to check for 24 character strings inside array
    .custom((values) => {
      let valid = true;
      values.forEach((value) => {
        if (value.length !== 24) {valid = false;}
      });
      return valid;
    })
    .withMessage('Genre IDs must be 24 characters long.'),
];

exports.validate = function (req, res, next) {
  const err = validationResult(req);
  if (err.isEmpty()) {
    return next();
  }
  err.errorStack = err.array();
  err.errorStack.forEach((e) => {e.name = e.param; e.message = e.msg;});
  err.status = 400;
  return next(err);
};
