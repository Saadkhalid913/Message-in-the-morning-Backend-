const config = require("config")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");



const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const userSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, minlength: 6, maxlength: 255, trim: true, unique: true},
  email: {type: String, lowercase: true, match: emailValidationPattern, maxlength: 255, trim: true, unique: true},
  password: {type: String, maxlength: 512}
})

userSchema.methods.generateAuthToken = function() {
  const key = config.get("key")
  const token = jwt.sign({_id: this._id}, key)
  return token 
}

module.exports = userSchema