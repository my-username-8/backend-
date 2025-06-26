const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
module.exports.signup = async (req, res) => {
  try {
    await User.create(req.body);
    res
      .status(201)
      .json({ message: "Success! Log in to access your dashboard." });
  } catch (err) {
    res.status(500).json({ message: "Sign Up Failed" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({
      username: username,
    });
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    const payload = {
      user_id: existingUser._id,
    };
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login Successful", token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};
