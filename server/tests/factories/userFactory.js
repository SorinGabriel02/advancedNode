require("../../models/User");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = () => {
  return new User({}).save();
};
