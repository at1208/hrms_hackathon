const express = require("express");
const router = express.Router();

const { create_employee,
        onboard_employee,
        accept_onboard_invitation,
        update_employee } = require("../controllers/employee_controller");

//ADMIN
router.post("/create/employee",  create_employee);
router.post("/onboard/employee/:employee_id", onboard_employee);

//EMPLOYEE
router.post("/accept/onboard/invitation", accept_onboard_invitation);
router.patch("/update/employee/:_id", update_employee);

module.exports = router;
