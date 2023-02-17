const mongoose = require("mongoose");
const mongooseValidator = require("mongoose-unique-validator");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
        trim : true,
        uppercase : true
    },
    age : {
        type : Number,
        required : true,
        validate(val){
            if(val < 0){
                throw new Error("Invalid age , shi daal de ....")
            }
        }

    },
    email : {
        type : String,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid email bro ....");
            }
        },
        unique : true,
        required : true
    },
    number : {
        type : Number,
        unique : true,
        validate(val){
            if((val+"").length !== 10){
                throw new Error("Invalid mobile number ...");
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    cpassword : {
        type : String,
        required : true
    },
    tokens : [{
        token : {
            type : String ,
            required : true
        }
    }]
});
studentSchema.methods.generateToken = async function(){
    try{
        const _id = this._id;
        const token = jwt.sign({_id} , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
        
    }catch(e){
        res.status(500).send(e);
    }
} 
studentSchema.pre("save" , async function(req,res){
    try{
        if(this.isModified("password")){
            this.password = await bcrypt.hash(this.password,10);
            this.cpassword = await bcrypt.hash(this.password,10);
        }
        
        
    }catch(e){
        res.send(e);
    }
})
studentSchema.plugin(mongooseValidator);
const Student = new mongoose.model("Student" , studentSchema);
module.exports = Student;