
const mongoose = require("mongoose");
const leaveTypeSchema = ({
    leave_type:{
        type:String,
        enum:[
            "sick_leave",
            "casual_leave",
            "maternity_leave",
            "paternity_leave",
            "bereavement_leave",
            "compensatory_leave",
            "unpaid_leave",
        ],
        required:true
    },

    leave_limit:{
        type:Number,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Leave', leaveTypeSchema);