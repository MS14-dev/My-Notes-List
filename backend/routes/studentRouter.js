//.env configuration
require('dotenv').config();
// node libraries import
const express = require('express');
const jwt = require('jsonwebtoken');
const {v1:uuid} = require('uuid');
const {SHA256} = require('crypto-js')

//import database models
const IUser = require('../models/IUser')

//student router defined
const studentRouter = express.Router();

studentRouter.use(express.json());

// the key for JWT uses
const KEY = process.env.TOKEN_KEY;

//sub router for signin users and validate their email.......
studentRouter.post('/signin', async (req,res)=>{
    try{
        let {userEmail} = req.body;
        //find the availability of the email
        let userData = await IUser.findOne({email:userEmail});
        console.log(userData)
        //when email is available
        if(userData == null){
            //generate a random password and hash it
            let randomPassword = uuid()
            let hashedRandomPassword = SHA256(randomPassword).toString();

            //get last user's id
            let lastUser = await IUser.find({},{id:1,_id:-1}).sort({_id:-1}).limit(1);
            //create new user's id
            let newUserId;
            lastUser.length == 0 ?  newUserId = 0 : newUserId = lastUser[0].id + 1 ;
            //create a new student account
            let newStudent = await IUser.create({id:newUserId,email:userEmail,password:hashedRandomPassword,accountType:'student'});
            res.status(200).send({response:true,message:randomPassword})
        }else{
            //when the user is already exist with particular email
            res.status(200).send({response:false,message:"The email is already taken :("})
        }
    }catch(err){
        console.log(err)
        res.status(500).send({response:false,message:"Something Went Wrong"})
    }
})

//student's login sub router.........
studentRouter.post('/login',async (req,res)=>{
    try{
        //catch the user's email and password from the request
        let {userEmail,userPassword} = req.body;

        //find the user according to the email and get password and status
        let userData = await IUser.findOne({email:userEmail,accountType:'student'},{password:1,status:1,id:1,email:1,accountType:1});
        //check the email availability
        if(userData != null){
            //check the password validity
            let hashedPassword = SHA256(userPassword).toString();
            if(userData.password == hashedPassword){
                //JWT creation
                let token = jwt.sign({
                    email:userData.email,
                    id:userData.id,
                    accountType:userData.accountType,
                    status:userData.status
                },KEY,{expiresIn:900})
                //check whether the user's first time or not
                if(userData.status == true){
                    //first time login user
                    //set firstTime = true
                    res.status(200).send({token,response:true,firstTime:true})
                }else{
                    //the user have enterted to the system early before
                    //set firstTime = false
                    res.status(200).send({token,response:true,firstTime:false})
                }
            }else{
                //password does not match with the email
                res.status(200).send({response:false,message:'Incorrect Password'});
            }
        }else{
            //the enter email is invalid
            res.status(200).send({response:false,message:'Invalid Email'});
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send({response:false,message:"Something Went Wrong:("})
    }
})

// sub route for handle the first time student entry/ detail update.........
//define to track the logged student email
let loggedEmail;
//middleware to verify the token of the student
const userVerify=(req,res,next)=>{
    //get the access token from request header
    let token = req.headers["access_token"];
    if(!token){
        //if there is no token
        res.status(200).send({response:false,message:"You haven't Logged"})
    }else{
        console.log("TOKEN",token)
        jwt.verify(token,KEY,(err,decode)=>{
            //if the token is modified
            if(err){
                res.status(500).send({response:false,message:"Authentication Failed"});
            }else{
                //get the logged email from the token
                loggedEmail = decode.email
                next();
            }
        })
    }
}
studentRouter.post('/info-update',userVerify,async(req,res)=>{
    try{
        let {firstName,lastName,mobile,dateOfBirth,password} = req.body
        //hash the new password
        let newHashedPassword = SHA256(password).toString();
        //update students details
        let updateDetails = await IUser.updateOne({email:loggedEmail},{
            $set:{
                firstName,
                lastName,
                mobile,
                dateOfBirth,
                password:newHashedPassword,
                status:false
            }
        })
        if(updateDetails){
            res.status(200).send({response:true,message:"Successfully Updated"});
        }else{
            throw new Error("Student info not updated")
        }
    }catch(err){
        console.log(err)
        throw err;
        res.status(500).send({response:false,message:"Somthing Went Wrong"});
    }
})


//export the student router to app.js
module.exports  = studentRouter;

//test password = fd5c7f50-fb91-11ec-a9d6-456f6e5b957a
//test email = m@gmail.com