const Employee = require("../models/employee_model");
const { errorHandler } = require("../utils/dbErrorHandler");

module.exports.create_employee = async (req, res) => {
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
           documents
         } = req.body;


       const docs = documents.map(item => {
         return { data: fs.readFileSync(item.data.path),
                  content_type:item.content_type
                 }
       })

       await Employee({
           employee_id:"EMP202001",
           first_name,
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
           documents:docs
        }).save((err, employee) => {
          if(err){
            return res.status(400).json({
              error: errorHandler(err)
            })
          }

          res.status(200).json({
            message: "New employee created.",
            employee: employee
          })
        })
}

module.exports.invite_employee_onboard = (req, res) => {
 
}
