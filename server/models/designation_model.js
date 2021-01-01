const mongoose = require("mongoose");

const desginationSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        default:null
    }
}, {timestamps:true});

module.exports = mongoose.model('Designation', desginationSchema);
