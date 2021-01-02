const Employee = require("../models/employee_model");
const { errorHandler } = require("../utils/dbErrorHandler");
const formidable = require('formidable');
const fs = require('fs');


const pad = (number, length) => {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

module.exports.create_employee =  (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
        return res.status(400).json({
            error: 'Documents could not upload'
        });
    }
  console.log(fields);

   const { first_name,
           last_name,
           role,
           category,
           date_of_joining,
           country_code,
           phone_number,
           department,
           designation,
           email,
           address,
           gender,
         } = fields;

      if(!first_name){
        return res.status(400).json({
          error: "First name is required"
        })
      }

      if(!gender){
        return res.status(400).json({
          error: "Gender is required"
        })
      }

      if(!date_of_joining){
        return res.status(400).json({
          error: "Date of joining is required"
        })
      }

      if(!country_code){
        return res.status(400).json({
          error: "country_code is required"
        })
      }

      if(!phone_number){
        return res.status(400).json({
          error: "Phone number is required"
        })
      }

      if(!email){
        return res.status(400).json({
          error: "Email is required"
        })
      }

      const employee_id = "EMP" + new Date().getFullYear() + pad(await Employee.countDocuments()+1, 4);

      const employee = new Employee();
          employee.first_name = first_name,
          employee.last_name = last_name,
          employee.employee_id = employee_id,
          employee.role = role,
          employee.category = category,
          employee.date_of_joining = date_of_joining,
          employee.country_code = country_code,
          employee.phone_number = phone_number,
          employee.department = department,
          employee.designation = designation,
          employee.email = email,
          employee.gender = gender

      if (files.document) {
        if (files.document.size > 30000000) {
            return res.status(400).json({
                error: 'File should be less then 3mb in size'
            });
        }
          employee.document.data = fs.readFileSync(files.document.path);
          employee.document.content_type = files.document.type;
      }

      await employee.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.status(200).json({
              message:"New employee successfully created"
            })
        })
    })
}