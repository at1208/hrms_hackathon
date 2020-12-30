const mongoose = require("mongoose");

const holidaySchema = ({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date, 
        required:true,
        unique:true
    },
    day:{
        type:String,
        default:null
    },
}, {timestamps:true})

module.exports = mongoose.model('Holiday', holidaySchema);