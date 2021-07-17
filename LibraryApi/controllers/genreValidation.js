const {body, validationResult} = require('express-validator');

exports.validationRules = () => [// validation chain
  // Validate and sanitize fields.
  body('name')
    // Sanitization //
    .trim().escape().toLowerCase()
    // custom sanitizer to replace multiple spaces for one space
    .customSanitizer((value) => value.replace(/\s\s+/g, ' '))
    // custom sanitizer to capitalize first letters
    .customSanitizer((value) => value.replace(
      /(?:^|\s)\S/g,
      (a) => a.toUpperCase(),
    ))
    // Validation //
    // check not empty
    .not()
    .isEmpty()
    .withMessage('Name must be specified.')
    .bail()
    // check minimum length
    .isLength({min: 2})
    .withMessage('Genre must be longer than two characters.')
    .bail()
    // custom validator to check for not alphanumeric or digits
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage('Genre must only contain alphanumeric characters and spaces.'),
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
