const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const departmentSchema = ({
    department_name:{
        type:String,
        unique:true,
        required:true
    },
    department_head:{
        type:ObjectId,
        ref:"Employee",
        default:null
    }

}, {timestamps:true})

module.exports = mongoose.model('Department', departmentSchema);