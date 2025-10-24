const  Chapter =  require ("../models/chapters");
const Subject =  require ("../models/subject")

const addchapters = async(req,res)=>{
try{
const{ chaptername ,  subject , discription } = req.body;
const newchapter = await Chapter.create({chaptername , subject , discription});
res.send("chapter  added succesfully");
}
catch(err){
    res.send("chapter not added ");
    console.log( "Error" + err)
}


}

// GET CHAPTERS BY SUBJECT NAME
const getchapters = async(req,res)=>{
   try {
    const {subjectname} = req.params;

    const clickedsubject = await Subject.findOne({ subjectname });
    if (!clickedsubject) {
      return res.status(404).send("Subject not found");
    }

    const chapters = await Chapter.find({ subject : clickedsubject._id })
                                  .populate("subject","subjectname");

    res.json(chapters);
   } catch(err){
    res.status(500).send("Error fetching chapters");
    console.log("Error"+ err)
   }
}


module.exports =  { addchapters , getchapters };