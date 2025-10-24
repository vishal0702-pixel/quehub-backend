const Year = require("../models/year");

const yearAdding = async (req, res) => {
  try {
    const {year} = req.body; 
    if (!year) return res.status(400).send("year_name is required");

    const addYear = await Year.create({ year });
    res.status(201).send(addYear);
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).send("Year not added");
  }
};

const yearchoice =  async(req,res)=>{
   
  try {
   const result = await Year.find({}).sort({year:1});
   if (!result) {
      return res.status(404).send("Year not found");
    }
    res.status(200).json(result);
   //const result =  result ; 
  }
   catch(err){
    res.send("error found");
    console.log("Error" + err)
   }


}


module.exports ={ yearAdding , yearchoice}


