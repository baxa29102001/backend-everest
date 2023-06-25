const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
