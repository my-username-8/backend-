const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  theme: {
    type: String,
    default: "Light",
  },
  language: {
    type: String,
    default: "English",
  },
});

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;
