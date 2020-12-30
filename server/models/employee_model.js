const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const employeeSchema = mongoose.Schema({
    employee_id : {
        type: String,
        unique:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name: {
        type:String,
        default:null
    },
    document_verification:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[
            'EMPLOYEE',
            'ADMIN',
            'SUPERADMIN'
        ],
        default:'EMPLOYEE'
    },
    category : {
        type:String,
        enum:[
            'INTERN',
            'PERMANENT',
            'TEMPORARY'
        ],
        default:'TEMPORARY'
    },
    date_of_joining: {
        type: Date,
        required : true
    },
    country_code:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        unique:true,
        required:true,
        max:15,
    },
    department: {
        type: ObjectId,
        ref: "Department"
    },
    designation:{
        type: ObjectId,
        ref : "Designation"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    email:{
        type:String,
        unique:true,
        default:null
    },
    address:{
        type:String,
        default:null
    }
},{ timestamps:true });

module.exports = mongoose.model('Employee', employeeSchema);
