const moongose = require("mongoose");

const groupSchema = new moongose.Schema({
  groupName: String,
  location: String,
  time: String,
  day: Number,
});

const Groups = moongose.model("groups", groupSchema);

module.exports = Groups;
