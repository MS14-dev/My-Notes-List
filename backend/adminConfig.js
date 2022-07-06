require('dotenv').config()
const {SHA256} = require('crypto-js')
const mongoose = require('mongoose')

// mongoDB database connection establish....
const databaseUrl = 'mongodb://localhost:27017/my_notes_list';

const database = mongoose.connect(databaseUrl);
database.then((db)=>{
   console.log("Successfully Connected to the database")
},(err)=>{
   console.log(err);
   throw err;
})

//iuser model require
const IUser = require('./models/IUser')

//admin emailand password form .env file
let ADMIN_EMAIL = process.env.ADMIN_EMAIL;
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const adminConfig=async()=>{
try{
    //check the admin details already have
    let isSet = await IUser.findOne({accountType:'admin'});
    if(isSet){
        console.log("Admin is already set in the database")
        return false
    }else{
        //get the last user document's details
        let lastUser = await IUser.find({},{id:1,_id:-1}).sort({_id:-1}).limit(1);
        //hashed admin password
        let password = SHA256(ADMIN_PASSWORD).toString();
        //admins id
        let adminId;
        if(lastUser.length == 0){
            adminId = 0 
        }else {
            adminId = (lastUser[0].id + 1)
        }
        let newAdmin  = await IUser.create({id:adminId,email:ADMIN_EMAIL,password,accountType:'admin'})
        console.log("Successfully added Admin to the database")
        return true;
    }
}catch(err){
    console.log(err)
    return false
}
}
adminConfig();