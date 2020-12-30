const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = mongoose.Schema({
      project_id:{
        type:ObjectId,
        ref:"Project",
        required:true
      },
      assigned_to:{
        type:ObjectId,
        ref:"Employee",
        required:true
      },
      report_to:{
        type:ObjectId,
        ref:"Employee",
        required:true
      },
      title:{
        type:String,
        min:5,
        max:80,
        required:true
      },
      description:{
        type:String,
        min:5,
        max:320
      },
      status:{
        type:String,
        enum:["Open", "Closed", "Done"],
        default:"Open"
      },
      comments:[{
        comment:String,
        commented_by:{
          type:ObjectId,
          ref:"Employee"
        }
      }],
      deadline:{
        type:Date,
        required:true
      },
      completed_at:{
        type:Date
      }
},{ timestamps: true })

module.exports = mongoose.model("Task", taskSchema);
