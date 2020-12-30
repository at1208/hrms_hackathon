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
    },
    hashed_password: {
        type: String,
        required: true
      },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: ''
    },
},{ timestamps:true });

employeeSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

employeeSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};


module.exports = mongoose.model('Employee', employeeSchema);
