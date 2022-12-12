const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Usermodel = mongoose.model("user", userSchema);
module.exports = { Usermodel };
