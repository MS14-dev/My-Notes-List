const {Schema,model} = require('mongoose');

// create userSchema and define schema values

const iUserSchema = new Schema({
    id:{
        type:Number,
        required:true,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        //no duplicated emails can access the system
        unique:true,
        required:true
    },
    dateOfBirth:{
        type:Date,
    },
    mobile:{
        type:Number,
    },
    status:{
        type:Boolean,
        //when the user newly enter, default value is "true"
        default:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        required:true,
        // only two types of users are in the system
        enum:["admin","student"]
    }
})

//create IUser model
const IUser = model('iuser',iUserSchema);

module.exports = IUser;