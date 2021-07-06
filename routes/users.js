const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const config =require("config");
const auth = require("../middlewear/auth_user")
const {ValidateSignup} = require("./Validation_Functions/validateBody") 

const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


const { userModel, postModel } = require("../models/models")

const router = express.Router()

router.post("/users/signup" , ValidateSignup,  async (req,res,next) => {
  let { username, email, password } = req.body
  username = username.toLowerCase()
  email = email.toLowerCase()

  let emailUserTest = await userModel.findOne({email: email})
  let usernameUserTest = await userModel.findOne({username: username}) 


  if ((usernameUserTest || emailUserTest)) return res.send({error: "user already exists"})

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







module.exports = router