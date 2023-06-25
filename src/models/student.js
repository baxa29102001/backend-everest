const mongoose = require("mongoose");
// const Groups = require("./group");

const studentSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  attendence: [
    {
      date: String, 
      reason: String,
    },
  ],

  groupNumber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "groups",
  },
  paid: Boolean,
});

const Students = mongoose.model("students", studentSchema);

module.exports = Students;
