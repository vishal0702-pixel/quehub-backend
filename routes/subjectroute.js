const  express =  require ("express");

const {addsubject , getsubject} = require("../controllers/subjectcards"); 

const subjectroutes = express.Router();

subjectroutes.post("/addsubject" , addsubject);
subjectroutes.get("/:year/getsubject" ,getsubject );

module.exports =  subjectroutes;