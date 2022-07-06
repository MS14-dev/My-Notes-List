// node libraries import
require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const {SHA256} = require('crypto-js')

//import database models
const IUser = require('../models/IUser')
const Note = require('../models/Note')

//admin router defined
const adminRouter = express.Router();

adminRouter.use(express.json())

//key for jwt
const KEY = process.env.TOKEN_KEY;

//track the logged email
let loggedEmail;

//admin authentication middleware.....
const adminVerification=(req,res,next)=>{
    try{
        //catch the access token from client/admin's token
        let token = req.headers['admin_access_token'];
        if(!token){
            //admin did not logged 
            res.status(200).send({response:false,message:"Need to login first"});
        }else{
            jwt.verify(token,KEY,(err,decode)=>{
                if(err){
                    //token has been modified
                    res.status(200).send({response:false,message:"Authentication Failed"});
                }else{
                    //catch the logged email from token
                    if(decode.accountType == 'admin'){
                        //verify is a admin
                        loggedEmail = decode.email;
                        next();
                    }else{
                        res.status(200).send({response:false,message:"Authentication Failed"});
                    }
                }
            })
        }
    }catch(err){
        console.log(err);
        res.status(200).send({response:false,message:"Authenication Failed"});
    }
}

//admin login route........
adminRouter.post('/login',async (req,res)=>{
    try{
        //catch the email and password from the request body
        let {email,password} = req.body;
        //hash the password
        let hashedPassword = SHA256(password).toString();
        let adminDetails = await IUser.findOne({email,password:hashedPassword,accountType:'admin'});
        
        if(adminDetails){
            //crate the token
            let token = jwt.sign({
                email,
                accountType:adminDetails.accountType
            },KEY,{
                expiresIn:900
            })
            console.log('ADMIN_LOG_CALLED')
            res.status(200).send({response:true,token});
        }else{
            res.status(200).send({response:false,message:"Invalid Credentials"});
        }
    }catch(err){
        console.log(err);
        res.status(200).send({response:false,message:"Something Went Wrong"});
    }
})

//route for get all the students details for admin
adminRouter.get('/all-student',adminVerification,async (req,res)=>{
    try{
        //get all the students details **without password
        let studentsList = await IUser.find({accountType:'student'});
        console.log('ALL_STUDENTS',studentsList)
        if(studentsList.length == 0){
            //no students register yet
            res.status(200).send({response:true,message:'Success',studentsList})
        }else{
            //send student details to admin-front-end
            res.status(200).send({response:true,message:'Success',studentsList})
        }
    }catch(err){
        console.log(err);
        res.status(200).send({response:false,message:"Something Went Wrong"})
    }
})

//export the admin router
module.exports  = adminRouter;