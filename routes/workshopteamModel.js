const mongoose = require("mongoose");

//schema for register data
const userSchema = new mongoose.Schema({
  name: String,
  techId: String,
  email: String,
});

module.exports = new mongoose.model("workshopteamData", userSchema);
