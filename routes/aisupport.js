const express = require("express");
const solvedoubt = require("../controllers/solvedoubt");
const usermiddleware = require("../middleware/usermiddleware");

const aisupportroute = express.Router();

aisupportroute.post("/chat", usermiddleware, solvedoubt);

module.exports = aisupportroute;
