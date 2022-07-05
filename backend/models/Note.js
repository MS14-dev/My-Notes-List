const {Schema,model} = require('mongoose');

//create schema for note
const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    email:{
        type:String,
        required:true
    }
})

//create notes model
const Note = model('note',noteSchema);

module.exports = Note;
