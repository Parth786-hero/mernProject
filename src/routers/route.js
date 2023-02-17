const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
router.get("/" , (req,res)=>{
    res.render("index");
})
router.get("/register" , (req,res)=>{
    res.render("register");
})
router.get("/login" , (req,res)=>{
    res.render("login");
})
router.get("/secret" , auth , (req,res)=>{
    const member = req.user;
    // console.log(member);
    res.render("secret" , {
        name : member.name,
        age : member.age , 
        email : member.email,
        number : member.number
    });
})
router.get("/logout" , auth , async (req,res)=>{
    try{
        res.clearCookie("jwt");
        const token = req.token;
        const member = req.user;
        // member.tokens = member.tokens.filter(obj=>{
        //     return obj.token !== token;
        // })
        member.tokens = [];
        await member.save();
        res.render("login");
    }catch(e){
        res.status(500).send(e);
    }
})
router.get("*" , (req,res)=>{
    res.send("<h1>404 error code bro ....</h1>")
})
module.exports = router;