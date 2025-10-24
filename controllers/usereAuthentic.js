const  User = require('../models/user');
const validate =  require('../utils/valitor');
require('dotenv').config();
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const usermiddleware = require("../middleware/usermiddleware")
const redisclient =  require("../config/redis_db")




const register = async(req,res)=>{
 try {    //valitaion all  the things
    validate(req.body);

    const {firstname, password , emailID } = req.body;

    // hashing of password 

     req.body.password = await bcrypt.hash(password ,10);
     req.body.role ="user";


    const user =  await User.create(req.body);

         //creating  token  for  user  access
     const  token = jwt.sign({ _id:user._id, emailID:emailID , role:"user"},process.env.JWT_TOKEN_KEY,{expiresIn:60*60});
       const result = {
        firstname: user.firstname,
        emailID : user.emailID,
        id  : user._id,
        password :user.password}
     res.cookie('token', token ,{maxAge:60*60*1000} );
     res.status(201).json(
      {
        user:result,
        message : "register succesfully"
      }
     )

     console.log("Incoming data:", req.body);


 }catch (Error) {
   console.error("Register Error:", Error.message);
   res.status(400).send("Error: " + Error.message);
}

}


const login = async (req, res) => {
  try {
    const { emailID, password } = req.body;

    if (!emailID || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ emailID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { _id: user._id, emailID: user.emailID, role: user.role },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true });

    const result = {
      firstname: user.firstname,
      emailID: user.emailID,
      id: user._id,
    };

    return res.status(200).json({
      user: result,
      message: "Login successful",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const logout = async(req,res)=>{

  const {token} = req.cookies ;

  const payload = jwt.decode(token);

  await redisclient.set(`token:${token}`, "blocked");
  await redisclient.expireAt(`token:${token}`, payload.exp);

  res.cookie("token" , null ,{ expires:new Date(Date.now())} );
  res.send("logged out  successfully");



};


module.exports = { register , login , logout } 