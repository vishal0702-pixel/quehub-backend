const  express =  require ("express");
const {addtopics , gettopics} = require("../controllers/chaptertopics")

const  topicsroute =  express.Router();

topicsroute.post ( "/addtopics" , addtopics);

topicsroute.get("/:chaptername/gettopics" , gettopics);

module.exports = topicsroute ;