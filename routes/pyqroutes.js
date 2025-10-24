const  express =  require ( "express");
const{addpyq,getpyq} = require("../controllers/subjectpyq")
const  pyqroutes = express.Router();

 pyqroutes.post( "/addpyq" , addpyq);

 pyqroutes.get("/:subjectname/getpyq" , getpyq);

 module.exports = pyqroutes ;