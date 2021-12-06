const mongoose = require("mongoose");

const { Schema } = mongoose;

const userScheme = new Schema({
  login: String,
  password: String
});

module.exports = User = mongoose.model("user", userScheme);
