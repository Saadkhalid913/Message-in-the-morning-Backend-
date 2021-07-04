const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const config =require("config");
const auth = require("../middlewear/auth_user")

const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const { userModel, postModel } = require("../models/models")

const router = express.Router()

router.post("/users/signup" , ValidateSignup,  async (req,res,next) => {
  let { username, email, password } = req.body
  username = username.toLowerCase()
  email = email.toLowerCase()

  let emailUserTest = await userModel.findOne({email: email})
  let usernameUserTest = await userModel.findOne({username: username}) 


  if (usernameUserTest || emailUserTest) return res.send({error: "user already exists"})

  const salt = await bcrypt.genSalt(10)
  password = await bcrypt.hash(password, salt)

  let user = new userModel({username, email, password})
  user = await user.save().catch({error: "There was an error on the serverside"})

  res.send({user_auth_token: user.generateAuthToken(),
            email: user.email,
          username: user.username})
})


router.post("/users/login", async (req,res) => {
  const { username, password } = req.body
  if (!username.match(emailValidationPattern)) {
    user = await userModel.findOne({username : username})
  }
  else {
    user = await userModel.findOne({email: username})
  }

  if (!user) return res.send({error: "Please provide a valid username or email"})
  const valid = await bcrypt.compare(password, user.password)

  if (!valid) return res.send({error: "invalid credentials"})

  else return res.send({user_auth_token: user.generateAuthToken()})
})


function ValidateRequest(req,res,next,fields) {
  for (let field of fields)
    if (!req.body[field]) {
      res.send({error: `Please provide field "${field}"`})
      return false 
    }
  return true 
}

function ValidateSignup(req,res,next) {

  if (!ValidateRequest(req,res,next, ["username" , "email", "password"])) return

  const { username, email, password } = req.body
  if (!(username.length >= 6)) {
    return res.send({error: "Please provide a username >= 6 characters in length"})
  }
  if (!email.match(emailValidationPattern)) {
   return res.send({error: "Please provide a valid email"})
  }

  if (!(password.length >= 8)) {
    return res.send({error: "Please provide a password >= 8 characters in length"})
  }

  next()
}





module.exports = router