require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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


// ✅ Step 1: Define allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://quehub-frontend.vercel.app"
];


// ✅ Step 2: Custom CORS middleware (handles Vercel preflight issue)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});


// ✅ Step 3: Standard Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ✅ Step 4: Routes
app.use("/user", userAuthrouter);
app.use("/year", yearrouter);
app.use("/subject", subjectroutes);
app.use("/chapter", chapterroutes);
app.use("/topics", topicsroute);
app.use("/pyq", pyqroutes);
app.use("/ai", aisupportroute);


// ✅ Step 5: Initialize DB and start server
const initializeConnection = async () => {
  try {
    await Promise.all([main(), redisclient.connect()]);
    console.log("✅ Database and Redis connected");

    const PORT = process.env.PORT_NUMBER || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening at port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Error initializing:", err);
  }
};

initializeConnection();


// ✅ Step 6: Export app (important for Vercel)
module.exports = app;
