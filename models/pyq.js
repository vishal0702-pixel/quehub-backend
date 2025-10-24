

const mongoose =  require ("mongoose");

const {Schema} = mongoose ;

const pyqSchema = new Schema ( {

    subject : {
        type: Schema.Types.ObjectId ,
        ref : "Subject"
    },


      files: [
      {
        title: { type: String },
        link: { type: String, required: true } // Google Drive / Cloudinary / Image URL
      }
    ]
    


 } , {
    timestamps: true
 })

 const PYQ = mongoose.model( "PYQ" , pyqSchema) ;

 module.exports =  PYQ ;