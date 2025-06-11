//import necessary modules
const express = require("express");
const cors = require("cors");

//creating an express application instance
const app = express();

//define port for the server to listen on:
//process.env.PORT for deployed services(netlify)
const PORT = 3000;

//CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL, // Example: 'https://your-netlify-app-domain.netlify.app'
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Deny the request
    }
  },
};

//MIDDLEWARE
app.use(cors(corsOptions));
//middleware to parse incoming request bodies with json payloads
app.use(express.json());

//Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
