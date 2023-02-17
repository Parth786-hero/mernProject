const express = require("express");
const router = new express.Router();
router.get("/" , (req,res)=>{
    res.render("index");
})
router.get("/register" , (req,res)=>{
    res.render("register");
})
router.get("/login" , (req,res)=>{
    res.render("login");
})
router.get("/secret" , (req,res)=>{
    res.render("secret");
})

router.get("*" , (req,res)=>{
    res.send("<h1>404 error code bro ....</h1>")
})
module.exports = router;