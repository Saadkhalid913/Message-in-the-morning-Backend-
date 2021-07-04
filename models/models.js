const mongoose = require("mongoose");
const userSchema = require("./userSchema")


const userModel = mongoose.model("users", userSchema);


module.exports = { userModel }