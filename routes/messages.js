const mongoose = require("mongoose");
const { userModel, messageModel } = require("../models/models");
const express = require("express");
const auth = require("../middlewear/auth_user")

const router = express.Router();


router.get("/messages", auth, async (req,res) => {
    const userID = req._user._id
    const user = await userModel.findById(userID);
    const messages = user.messages;
    res.send(messages)
})

router.get("/messages/recent", auth, async (req,res) => {
    const MillisecondsInDay = 1000 * 60 * 60 * 24
    const CurrentTimeInMilliseconds = Date.now()
    const userID = req._user._id
    const user = await userModel.findById(userID);
    let messages = user.messages;
    recentMessages = messages.filter(m => (m.timeCreated.valueOf() + MillisecondsInDay > CurrentTimeInMilliseconds))
    res.send(recentMessages)
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

router.post("/messages/delete/:id", auth, async (req,res) => {
    const userID = req._user._id
    const id = req.params.id;

    const user = await userModel.findById(userID);
    const index = user.messages.findIndex(m => m._id.toString() === id)
    if (index < 0) return res.send(null)
    const message = user.messages[index]
    user.messages.splice(index, 1)
    await user.save()
    res.send(message)
})


module.exports = router;
