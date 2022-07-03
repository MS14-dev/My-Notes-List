// node libraries import
const express = require('express');
const jwt = require('jsonwebtoken');

//import database models
const IUser = require('../models/IUser')

//admin router defined
const adminRouter = express.Router();

//get-admin-sub-route for get admin details
adminRouter.get('/',async (req,res)=>{
    try{
        let data = await IUser.create({
            id:123,
            firstName:'Malindu',
            lastName:"Shamalka",
            email:'mshamalka@gmail.com',
            dateOfBirth:'1999-11-15',
            mobile:0112345456,
            status:false,
            password:'my_password',
            accountType:'student'
        })
        if(data._id){
            res.send(data)
        }else{
            throw new Error("Database error occured");
        }
    }catch(err){
        //when database error occred this block return the error message
        console.log(err.message);
        res.status(500).send("Error Occured");
    }
})

//export the admin router
module.exports  = adminRouter;