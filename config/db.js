const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log("MongoDB Atlas Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Connection Error: ", error.message);
  }
};

module.exports = connectDb;
