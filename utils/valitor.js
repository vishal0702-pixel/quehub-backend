const validator = require("validator");

const validate = (data)=>{

const mandatoryfield = ["firstname","password","emailID"];

const isallowed = mandatoryfield.every((k)=>Object.keys(data).includes(k))

if (!isallowed){
    throw new Error ( "some fields missing ") ;
}

if (!validator.isEmail(data.emailID)){
    throw new Error ("check  your  email  id ") ;
}

if ( !validator.isStrongPassword(data.password)){
    throw new Error ( " create strong  password")
}

}

module.exports= validate ;