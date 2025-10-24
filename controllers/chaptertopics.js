const  Topics =  require("../models/topic");
const  Chapter =  require("../models/chapters");

const addtopics =  async(req ,res)=>{

    try {
const {topicname,chapter , notes , description , videos} =  req.body;

const  newtopic = await Topics.create({topicname , chapter ,notes , description , videos});

res.send("added  succesfully")
}
catch(err){
    res.send("not added")
}}

const gettopics =  async(req, res)=>{

    try{
         
        const{chaptername} =  req.params;

        const findchapter = await Chapter.findOne({chaptername}); 

        const findtopics =  await Topics.find({chapter : findchapter._id}).populate("chapter" , "chaptername");

        res.json(findtopics)
    }
    catch(err){
        res.send("can't fetch")
    }
}


module.exports = { addtopics, gettopics };
