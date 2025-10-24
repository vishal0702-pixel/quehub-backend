const mongoose =  require ("mongoose");


const {Schema} = mongoose ;

const topicSchema =  new Schema ({

    chapter : {
        type:Schema.Types.ObjectId,
        ref:"Chapter"
    },
   
    topicname:{
        type:String,
        required:true,
        unique:true
    },

    discription : {
     type : String,
    },

    // Array of Notes links
    notes: [
      {
        title: { type: String, required: true }, // e.g., "Algebra Notes"
        link: { type: String, required: true }
      }
    ],

    videos:[
        {
            title:{type:String ,required:true}, // e.g  DSA
            videolink:{type:String , required :true}
        }
    ]
 }, {
    timestamps:true
 })

const Topics =  mongoose.model("Topic" , topicSchema);

module.exports = Topics;