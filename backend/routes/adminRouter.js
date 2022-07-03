// node libraries import
const express = require('express');

//admin router defined
const adminRouter = express.Router();

//get-admin-sub-route for get admin details
adminRouter.get('/',async (req,res)=>{
    try{
        res.send({hi:'Helo'});
    }catch(err){
        console.log(err.message);
        throw err;
    }
})

//export the admin router
module.exports  = adminRouter;