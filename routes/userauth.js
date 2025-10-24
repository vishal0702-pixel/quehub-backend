const express = require('express');
const userAuthrouter= express.Router();
const usermiddleware = require("../middleware/usermiddleware")

const {register , login , logout}= require("../controllers/usereAuthentic");
const { default: isEmail } = require('validator/lib/isEmail');


    //register 
    userAuthrouter.post( "/register" ,register)
    //login
    userAuthrouter.post("/login" , login) 
    //logout
    userAuthrouter.post("/logout", usermiddleware ,logout)

    //usreauthentication 

    userAuthrouter.get("/check" , usermiddleware , (req,res)=>{

        const  reply = { 
            firstname : req.result.firstname ,
            emailID :req.result.emailID,
             id : req.result._id        }

             res.json({
                user:reply,
                message:"checked  user  sucessfully"
             })
    })
    //getprofile

    //userAuthrouter.get("./getprofilr" , getprofile)


    module.exports =  userAuthrouter ;