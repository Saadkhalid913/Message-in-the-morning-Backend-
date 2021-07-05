function ValidateRequest(req,res,next,fields) {
    for (let field of fields)
      if (!req.body[field]) {
        res.send({error: `Please provide field "${field}"`})
        return false 
      }
    return true 
  }


function ValidateEmailList(req,res,next) {
    if (!ValidateRequest(req,res,next, ["name", "recipients"]))
        return
    else
        next()
}


module.exports = {ValidateEmailList}