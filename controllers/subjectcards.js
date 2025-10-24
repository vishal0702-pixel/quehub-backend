const Subject = require("../models/subject");
const Year = require ("../models/year")

const addsubject = async (req, res) => {
  try { 
    console.log(req.body);
    const { subjectname, year } = req.body;
  
    if (!subjectname || !year) {
      return res.status(400).send("Invalid subject name or year ID");
    }

    const newSubject = await Subject.create({ subjectname, year });

    res.status(201).json({ message: "Subject added successfully", newSubject });

  } catch (err) {
    console.error("Error: " + err);
    res.status(500).send("Server error");
  }
};

const getsubject = async(req,res)=>{ 

    try{
 const{year} = req.params ; 

 const acdemicyear = await Year.findOne({year}) ;

 const subjects = await Subject.find({year : acdemicyear._id}).populate("year", "year")

 res.json(subjects);}
 catch(err){
    res.send("subject  not  found");
    console.log("Error" + err)
 }

}

module.exports = {addsubject,getsubject};






