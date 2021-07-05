const mongoose = require("mongoose");
const express = require("express");
const{ emailListModel, userModel } = require("../models/models")
const router = express.Router()

const auth = require("../middlewear/auth_user")
const {ValidateEmailList} = require("./Validation_Functions/validateBody")


router.post("/lists", auth, ValidateEmailList, async (req,res) => {
    const userID = req._user._id;
    const { name, recipients } = req.body;

    const list = new emailListModel({ name, recipients })
    const user = await userModel.findById(userID);

    user.emailLists.push(list)
    user.save().then(() => res.send(list))
})


router.get("/lists", auth, async (req,res) => {
    const userID = req._user._id;
    const user = await userModel.findById(userID);
    const lists = user.emailLists;
    res.send(lists);
})


module.exports = router