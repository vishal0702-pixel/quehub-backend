require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const main = require('./config/db');
const redisclient = require('./config/redis_db');

const userAuthrouter = require("./routes/userauth");
const usermiddleware = require("./middleware/usermiddleware");
const yearrouter = require('./routes/yearoption');
const subjectroutes = require('./routes/subjectroute');
const chapterroutes = require('./routes/chapter');
const topicsroute = require('./routes/topicsroute');
const pyqroutes = require('./routes/pyqroutes');
const aisupportroute = require('./routes/aisupport');

const app = express();

/* ✅ Allowed frontend origins */
const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-frontend.vercel.app"
];

/* ✅ CORS middleware — this works even on Vercel */
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // ✅ Handle preflight (OPTIONS) request quickly
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

/* ✅ Body parsers and cookies */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ✅ Your routes */
app.use("/user", userAuthrouter);
app.use("/year", yearrouter);
app.use("/subject", subjectroutes);
app.use("/chapter", chapterroutes);
app.use("/topics", topicsroute);
app.use("/pyq", pyqroutes);
app.use("/ai", aisupportroute);

/* ✅ DB + Redis initialization */
const initializeConnection = async () => {
  try {
    await Promise.all([main(), redisclient.connect()]);
    console.log("✅ Database and Redis connected");

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error initializing:", err);
  }
};

initializeConnection();

/* ✅ Export app for Vercel */
module.exports = app;
