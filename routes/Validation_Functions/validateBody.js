function ValidateRequest(req,res,next,fields) {
    for (let field of fields)
      if (!req.body[field]) {
        res.send({error: `Please provide field "${field}"`})
        return false 
      }
    return true 
  }



module.exports = {}