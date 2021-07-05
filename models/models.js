const mongoose = require("mongoose");
const userSchema = require("./userSchema")
const messageSchema = require("./messageSchema")

const userModel = mongoose.model("users", userSchema);
const messageModel = mongoose.model("messages", messageSchema)


module.exports = { userModel, messageModel } 