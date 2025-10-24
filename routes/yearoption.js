const express =  require ( "express") ;
const  {yearAdding, yearchoice } = require("../controllers/academicyear")

const yearrouter = express.Router();

yearrouter.post("/addyear" , yearAdding)
yearrouter.get("/" , yearchoice );

module.exports= yearrouter;