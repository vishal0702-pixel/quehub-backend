const mongoose = require ('mongoose');
require('dotenv').config();

async function main ( ){
   await mongoose.connect("mongodb+srv://Vishal:07022005vishal@database.zzugmbr.mongodb.net/quehub");
}

module.exports = main;