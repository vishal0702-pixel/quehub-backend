const mongoose = require ( "mongoose") ;

const {Schema} = mongoose ;


const  chapterSchema = new Schema({
    

     subject :{
        type:Schema.Types.ObjectId,
        ref:"Subject"
     },
chaptername:{ type:String,
          required:true,
         
          } ,

 discription:{
           type:String,
         
         }   
   
 
 
        } ,{
            timestamps:true
        }
)

const Chapter =  mongoose.model("Chapter" , chapterSchema);

module.exports = Chapter;