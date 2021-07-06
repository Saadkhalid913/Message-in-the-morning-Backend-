const mongoose = require("mongoose");
const { userModel, messageModel } = require("../models/models");
const express = require("express");
const auth = require("../middlewear/auth_user")

const router = express.Router();


router.get("/messages", auth, async (req,res) => {
    const userID = req._user._id
    const user = await userModel.findById(userID);
    const messages = userModel.messages;
    res.send(messages)
})

router.get("/messages/recent", auth, async (req,res) => {
    const MillisecondsInDay = 846000000
    const CurrentTimeInMilliseconds = Date.now()
    const userID = req._user._id
    const user = await userModel.findById(userID);
    let messages = user.messages;
    recentMessages = messages.filter(m => (CurrentTimeInMilliseconds - m.timeCreated.getTime()) < MillisecondsInDay )
})

router.post("/messages", auth, async (req,res) => {
    const userID = req._user._id;
    const { title, body, link } = req.body;
    const message = new messageModel({author: userID, title, body, link })
    const user = await userModel.findById(userID);
    user.messages.push(message);
    await user.save()
    res.send(message)
})


module.exports = router;
