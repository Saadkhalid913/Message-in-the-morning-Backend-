const express = require("express");
const path = require("path")

const router = express.Router()


router.get("/:filename", (req,res) => {
    const pathToFile = path.join(__dirname, "/templates", req.params.filename)
    res.sendFile(pathToFile) 
})




module.exports = router