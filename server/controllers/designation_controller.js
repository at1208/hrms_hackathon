const Designation  =  require('../models/designation_model');
const { errorHandler } = require('../utils/dbErrorHandler');


module.exports.create_designation = async(req, res) =>{
    const {
        title, 
        description
        } = req.body;

    await Designation({
        title:title,
        description:description
        }).save((err, designation)=>{
            if(err) 
                return res.status(400).json({
                    error : errorHandler
                })
            else 
                return res.status(200).json({
                        message:"Designation Created",
                        designation: designation
                    })
                })
    }

        
module.exports.update_designation = async(req, res) => {
    const { _id } = req.params;
    const { title, description} = req.body;
    await Designation.findByIdAndUpdate({ _id }), {title:title, description:description}, (err, designation) => {
            if(err){
                return res.status(400).json({
                error: err
                })
            }
            res.status(200).json({
                message: "designation details updated successfully.",
                designation:designation
            })
    }
}
         
module.exports.all_designations = (req, res) => {
    designation.find({ del_flag: false })
    .exec((err, result) => {
    if(err){
        return res.status(400).json({
        error:err
        })
    }
    res.status(200).json({
            designations: result
        })
    })
}
         
module.exports.single_designation = (req, res) => {
const { _id } = req.params;
    designation.findById({ _id })
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
            error:err
            })
        }
        res.status(200).json({
            designation: result
        })
    })
}
         
module.exports.delete_designation = (req, res) => {
    const { _id } = req.params;
    designation.findByIdAndUpdate({ _id }, { del_flag: true }, { new:true })
    .exec((err, result) => {
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            message:"designation deleted successfully"
        })
    })
}
