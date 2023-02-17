require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
const router = require("./routers/route");
require("./database/conn");
const staticPath = path.join(__dirname , "../public");
app.use(express.static(staticPath));
const Student = require("./models/studentModel");
app.use(cookieParser());
app.use(router);
app.set("view engine" , "hbs");
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const dynamicPath = path.join(__dirname , "../templates/views");
const partailsPath = path.join(__dirname , "../templates/partials");
hbs.registerPartials(partailsPath);
app.set("views" , dynamicPath);


app.post("/register" , async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword){
            const member = new Student(req.body);
            const memberAdded = await member.save();
            const token = await member.generateToken();
            res.cookie("jwt" , token , {
                httpOnly : true
            })
            res.render("login");
        }else{
            res.send("Password did not match ....");
        }
    }catch(e){
        res.status(500).send(e);
    }
})

app.post("/login" ,async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        const member = await Student.findOne({email});
        if(member === null){
            res.send("Invalid details ....");
        }else{
            const verify = await bcrypt.compare(password,member.password);
            if(verify){
                const token = await member.generateToken();
                res.cookie("jwt" , token , {
                    httpOnly : true,
                    // expires : new Date(Date.now() + 5000)
                })
                res.render("index");
            }else{
                res.send("Invalid details ....");
            }
        }
    }catch(e){
        res.status(400).send(e);
    }
})
const port = process.env.PORT || 8000;
app.listen(port , ()=>{
    console.log("I am onn at port no. 8000 , ");
})