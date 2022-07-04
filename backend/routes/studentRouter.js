//.env configuration
require('dotenv').config();
// node libraries import
const express = require('express');
const jwt = require('jsonwebtoken')

//student router defined
const studentRouter = express.Router();

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

//export the student router
module.exports  = studentRouter;