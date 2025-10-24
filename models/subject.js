const mongoose = require ("mongoose");

const{Schema} = mongoose ;

const  subjectSchema = new Schema({

    year:{
        type:Schema.Types.ObjectId,
        ref:"Year"
    },

    subjectname:{
        
        required:true , 
        unique:true,
        type : String,

     }

},{
    timestamps:true
})

const Subject = mongoose.model( "Subject" , subjectSchema );
module.exports = Subject ;