const config = require("config")
const jwt = require("jsonwebtoken")
const { userModel } = require("../models/models")

module.exports = async function(req,res,next) {
  console.log(req.body)
  if (!(req.body.user_auth_token || req.headers.user_auth_token) ) return res.send({error: "no token provided"})
  const token = req.body.user_auth_token || req.headers.user_auth_token
  try {
    const decoded = await jwt.verify(token, config.get("key"))
    const savedUser = await userModel.findById(decoded._id)
    if (!savedUser) return res.send({error:"invalid token"})
    req._user = decoded
    next()
  }
  catch(err) {
    return res.send({error: "invalid token"})
  }
}