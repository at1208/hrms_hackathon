const Employee = require("../models/employee_model");
const { errorHandler } = require("../utils/dbErrorHandler");
const { send_email } = require("../utils/send_email");
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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


module.exports.onboard_employee = (req, res) => {
    const { employee_id } = req.params;
    Employee.findOne({ employee_id })
     .exec((err, employee) => {
       if(err){
         return res.status(400).json({
           error: err
         })
       }
    const { first_name, email, _id, employee_id } = employee;
    const token = jwt.sign({ first_name, _id, email }, process.env.JWT_INVITATION, { expiresIn: '1d' });

    let html = `<div style="padding-left:20px; padding-right:20px">
                 <h1 style="text-align:center">Welcome you on board!</h1>
                 <div style="text-align:left;">Hi ${first_name},</div>
                 <p>
                  Congratulations on being part of the team! The whole company welcomes you and we look forward to a successful journey with you! Welcome aboard!
                 </p>
                 <p>Please click on the following button to activate your acccount:</p>
                 <div style= "text-align:center; padding:20px 20px 20px 20px;" >
                   <a href=${process.env.CLIENT_URL}/auth/onboard/${token}>
                     <button style="padding:10px 30px; background:linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%); color:white; font-weight:700; border:0px; font-size:20px">
                       Accept invitation
                     </button>
                   </a>
                 </div>
                 <hr />
                 <p>This email may contain sensetive information</p>
               </div>`

    send_email(email, "Welcome you onboard", html)
    .then(() => {
      return res.status(200).json({
        message:"Invitation sent successfully."
      })
    })
    .catch(console.error)
     })
}

module.exports.accept_onboard_invitation = (req, res) => {
    const { token, password } = req.body;
    if(!password){
      return res.status(400).json({
        error: "Password is required"
      })
    }
   if (token) {
       jwt.verify(token, process.env.JWT_INVITATION, function(err, decoded) {
           if (err) {
               return res.status(401).json({
                   error: 'Expired link'
               });
           }
           const { _id } = jwt.decode(token);
           Employee.findById(_id)
             .exec((err, result) => {
               if(err){
                 return res.status(400).json({
                   error: err
                 })
               }
               if(result.length>0){
                 return res.status(200).json({
                     result:"Account is activated already"
                 })
               }

             bcrypt.genSalt(10, function(err, salt) {
                 bcrypt.hash(password, salt, function(err, hashedPassword) {
                   Employee.findByIdAndUpdate({_id: result._id}, { password: hashedPassword, isActive:true }, { new: true })
                     .exec((err, response) => {
                       if(err){
                         return res.status(400).json({
                           error: err
                         })
                       }
                       return res.status(200).json({
                            message: "Invitation accepted successfully"
                       })
                     })
                 });
              });
            })
       });
   } else {
       return res.json({
           message: 'Something went wrong. Try again'
       });
   }
}

module.exports.update_employee = (req, res) => {
  const { _id } = req.params;
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
        return res.status(400).json({
            error: 'Documents could not upload'
        });
    }
    const { first_name,
            last_name,
            country_code,
            phone_number,
            email,
            address,
            gender
          } = fields


    Employee.findOne({ _id })
     .exec((err, employee) => {
           if(err){
             return res.status(400).json({
               error: err
             })
           }
           if(first_name){
              employee.first_name = first_name
           }
           if(last_name){
              employee.last_name = last_name
           }
           if(country_code){
              employee.country_code = country_code
           }
           if(phone_number){
              employee.phone_number = phone_number
           }
           if(email){
               employee.email = email
           }
           if(gender){
              employee.gender = gender
           }
           if(address){
              employee.address = address
           }

       if (files.document) {
         if (files.document.size > 30000000) {
             return res.status(400).json({
                 error: 'File should be less then 3mb in size'
             });
         }
           employee.document.data = fs.readFileSync(files.document.path);
           employee.document.content_type = files.document.type;
       }

       if (files.picture) {
         if (files.picture.size > 10000000) {
             return res.status(400).json({
                 error: 'File should be less then 1mb in size'
             });
         }
           employee.picture.data = fs.readFileSync(files.picture.path);
           employee.picture.content_type = files.picture.type;
       }

       employee.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          res.status(200).json({
            message: "Employee information updated successfully."
          })
      });
    })
  })
}


module.exports.signin = (req, res) => {
  const { email, password } = req.body;
  if(!email){
    return res.status(400).json({
      error: "Email is required."
    })
  }
  if(!password){
    return res.status(400).json({
      error: "Password is required."
    })
  }
  //check if email exist in db. if it exist then take out the employee data
  Employee.findOne({ email })
    .exec(async (err, employee) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }
      if(!employee){
        return res.status(404).json({
         error: "Employee with given email does not exit."
        })
      }
      // now compare the given password with db's password
       let result = await bcrypt.compare(password, employee.password);
       if(result === false){
         return res.status(400).json({
           error: "Invalid email or password"
         })
       }else if (result === true) {
           const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
           res.cookie('token', token, { expiresIn: '7d' });
           const { _id, first_name, email } = employee;
           return res.json({
               token,
               employee: { _id, first_name, email  }
           });
       }else {
         res.status(400).json({
             error: "Something went wrong."
           })
       }
    })
}


module.exports.all_employee = (req, res) => {
  Employee.find({ isActive: true })
   .exec((err, result) => {
     if(err){
       return res.status(400).json({
         error:err
       })
     }
     res.status(200).json({
        employees: result
     })
   })
}
