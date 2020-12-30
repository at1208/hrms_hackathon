const express = require("express");
const router = express.Router();

const { create_employee } = require("../controllers/employee_controller");

const { create_employee_validator } = require("../validators/employee_validator");
const { run_validation } = require("../validators")

router.post("/create/employee", create_employee_validator, run_validation, create_employee);

module.exports = router;
