const mongoose = require('mongoose');
const {Schema} = mongoose 

const userSchema = new Schema({

    firstname:{
        type:String,
        required:true,
        minLengt:3,
        maxLength:10
        },
    lastname:{
        type:String,
  
        minLengt:3,
        maxLength:10
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    photo:{
        type:String,
        default:"default"
    },
    password:{
        type:String,
        required:true
    }


    },{
        timestamps:true
    }

);

const User = mongoose.model( "user",userSchema);

module.exports =  User; 