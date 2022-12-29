const mongoose = require("mongoose");

//schema for register data
const userSchema = new mongoose.Schema({
  teamName: String,
  leaderName: String,
  leaderTechId: String,
  memberNames: [],
  memberTechIds: [],
  competitions: String,
});

module.exports = new mongoose.model("teamData", userSchema);
