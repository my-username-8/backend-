//import necessary modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
//creating an express application instance
const app = express();

const PORT = process.env.PORT | 5000; //process.env.PORT will be assigned by render

//CORS setup
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // only if you're sending cookies or auth headers
  })
);

//middleware to parse incoming request bodies with json payloads
app.use(express.json());

app.get("/", (req, res) => {
  res.json("request incoming");
});

//testing for a request
app.get("/getQuote", (req, res) => {
  res.json({ quote: "Let the day unfold..." });
});

//Database connect and Server start

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to database. Server not started.");
  }
};

startServer();
