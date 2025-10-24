require('dotenv').config();
const express = require('express');
const app = express();
const main =  require('./config/db');
const cookieParser = require('cookie-parser');
const userAuthrouter = require("./routes/userauth");
const redisclient = require("./config/redis_db")
const usermiddleware = require("./middleware/usermiddleware");
//const yearAdding = require('./controllers/yearoption');
const yearrouter = require('./routes/yearoption');
const subjectroutes = require('./routes/subjectroute');
const chapterroutes = require('./routes/chapter');
const topicsroute = require('./routes/topicsroute');
const pyqroutes = require('./routes/pyqroutes');
const aisupportroute =  require('./routes/aisupport')
const cors = require('cors')
 

app.use(cors({
  origin: ["http://localhost:5173",'https://quehub-frontend.vercel.app'], // your frontend URL
  credentials: true,               // allow cookies
  
}));


app.use(express.json());
app.use(express.urlencoded({      // parses application/x-www-form-urlencoded
  extended: true
}));
app.use(cookieParser());


app.use("/user" , userAuthrouter)

app.use("/year", yearrouter )
 
app.use("/subject" , subjectroutes )

app.use("/chapter" , chapterroutes )

app.use("/topics" , topicsroute)

app.use("/pyq" , pyqroutes)

app.use("/ai" , aisupportroute)


const intializeconnection = async()=>{
 
    try{
    await Promise.all([main(),redisclient.connect()])
    console.log("DB connected");
    
    app.listen(process.env.PORT_NUMBER, ()=>{
               console.log("server listening at 3000");
                });
               }
   catch(err){
    console.log("Error" + err)
   }


}
    
intializeconnection();




