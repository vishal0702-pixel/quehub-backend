const PYQ  = require("../models/pyq");

const Subject = require("../models/subject");

const addpyq =  async(req ,res)=>{

    try {
const {subject , files} =  req.body;

const  newpyqfile = await PYQ.create({subject,files});

res.send("file added succesfully")
}
catch(err){
    res.send("not added")
}}

const getpyq =  async(req, res)=>{

    try{
         
        const{subjectname} =  req.params;

        const findsubject= await Subject.findOne({subjectname}); 

        const findpyqfile =  await PYQ.find({subject : findsubject._id}).populate("subject" , "subjectname");

        res.json(findpyqfile)
    }
     catch (err) {
    console.log("Error in getpyq:", err);
    res.status(500).send("can't fetch");
  }
}


module.exports = {addpyq ,  getpyq};