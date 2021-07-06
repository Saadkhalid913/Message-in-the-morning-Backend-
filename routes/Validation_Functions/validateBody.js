function ValidateRequest(req,res,fields) {
    for (let field of fields)
      if (!req.body[field]) {
        res.send({error: `Please provide field "${field}"`})
        return false 
      }
    return true 
  }

function ValidateSignup(req, res, next) {
  if (!ValidateRequest(req,res,["username", "email", "password"])) return;
  const {email, username, password} = req.body
  if (!ValidateEmail(email)) return res.send({error:"Invalid Email"})
  if ((!password || password.length < 8)) return res.send({error:"password must be at least 8 characters"})
  next()
}

function ValidateEmail(email) {
  const emailValidationPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return email.match(emailValidationPattern)
}

module.exports = {ValidateSignup}