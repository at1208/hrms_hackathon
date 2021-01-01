const { check } = require('express-validator');

exports.create_department_validator = [
    check('department_name')
        .not()
        .isEmpty()
        .withMessage('Department name is required'),

    check('department_head')
        .not()
        .isEmpty()
        .withMessage('Department head is required')
];
