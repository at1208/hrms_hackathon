const { check } = require('express-validator');

exports.designation_validator = [
      check('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),

];