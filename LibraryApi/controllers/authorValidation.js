const {body, validationResult} = require('express-validator');

exports.validationRules = () => [// validation chain
  // Validate and sanitize fields.
  body('first_name')
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
    .withMessage('First name must be specified.')
    .bail()
    // check minimum length
    .isLength({min: 2})
    .withMessage('First name must be longer than two characters.')
    .bail()
    // custom validator to check for not alphanumeric or digits
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage('First name has non-alphanumeric characters or digits.'),

  body('family_name')
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
    .withMessage('Family name must be specified.')
    .bail()
    // check minimum length
    .isLength({ min: 2 })
    .withMessage('Family name must be longer than two characters.')
    .bail()
    // check for not alphanumeric
    // custom validator to check for not alphanumeric or digits
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage('Family name has non-alphanumeric characters or digits.'),

  body('date_of_birth')
    // Sanitization //
    .trim().escape()
    // Validation //
    // check not empty
    .not()
    .isEmpty()
    .withMessage('date_of_birth must be specified.')
    .bail()
    // check for valid date
    .isISO8601()
    .toDate()
    .withMessage('Invalid date of birth, date has to be in ISO8601 format.')
    .bail()
    // check if date is before present
    .isBefore()
    .withMessage('Date can not be greater than today')
    .bail()
    // check if date of birth is lower than date of death
    .custom((value, { req }) => {
      if (req.body.date_of_death != null) {
        return new Date(value) < new Date(req.body.date_of_death);
      }
      // skip if no date of death
      return true;
    })
    .withMessage('Date of birth is greater than Date of death'),

  body('date_of_death')
    // Sanitization //
    .trim().escape()
    // Validation //
    // input can be false
    .optional({checkFalsy: true})
    // check for valid date
    .isISO8601()
    .toDate()
    .withMessage('Invalid date of death, date has to be in ISO8601 format.')
    .bail()
    // check if date is before present
    .isBefore()
    .withMessage('Date can not be greater than today')
    .bail(),
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
