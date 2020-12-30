const { check } = require('express-validator');

exports.create_employee_validator = [
      check('first_name')
      .not()
      .isEmpty()
      .withMessage('First name is required'),

      check('gender')
      .not()
      .isEmpty()
      .withMessage('Gender is required'),

      check('date_of_joining')
      .not()
      .isEmpty()
      .withMessage('Date of joining is required'),

      check('country_code')
      .not()
      .isEmpty()
      .withMessage('Country code is required'),

      check('phone_number')
      .not()
      .isEmpty()
      .withMessage('Phone number is required'),

      check('email')
      .not()
      .isEmpty()
      .withMessage('Email is required'),


];
