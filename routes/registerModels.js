const mongoose = require("mongoose");
const slugify = require("slugify");
var findOrCreate = require("mongoose-findorcreate");

//schema for register data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  gender: String,
  techId: {
    type: String,
    default: this.id,
  },
  age: Number,
  slugName: String,
  proivder: String,
});

userSchema.pre("validate", function (next) {
  if (this.name) {
    this.slugName = slugify(this.name); //slugify user name
  }
  this.techId = this.id;
  next();
});

userSchema.plugin(findOrCreate); //for google auth user

module.exports = new mongoose.model("userData", userSchema);
