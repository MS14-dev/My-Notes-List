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

//get-student-sub-route for get admin details
studentRouter.get('/',async (req,res)=>{
    try{
        let key = process.env.TOKEN_KEY;
        res.send({hi:key});
    }catch(err){
        console.log(err.message);
        throw err;
    }
})

//sub router for signin users and validate their email
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

//export the student router
module.exports  = studentRouter;