const express =  require("express");

const { addchapters , getchapters } =  require("../controllers/chaptername")

const chapterroutes =   express.Router();

chapterroutes.post("/addchapters" , addchapters);

chapterroutes.get("/:subjectname/getchapters" , getchapters);

module.exports = chapterroutes ;