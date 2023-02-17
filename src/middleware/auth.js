const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verify = await jwt.verify(token , process.env.SECRET_KEY);
        const member = await Student.findById(verify._id);
        req.token = token;
        req.user = member;
        next();
    }catch(e){
        res.status(500).send(e);
    }

}
module.exports = auth;