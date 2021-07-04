// this is the router for creating and sending emails with the api, all routes are protected 

const auth = require("../middlewear/auth_user")
const mongoose = require("mongoose")
const { userModel , sentEmailModel, emailListModel, emailTemplateModel } = require("../models/models");
const config = require("config");
const express = require("express");

const router = express.Router();

router.get("/emails", auth, async (req,res) => {
    const userID = req._user._id
    const user = await userModel.findById(userID);
    const sentEmails = user.sentEmails;
    res.send(sentEmails)
})


router.post("/emails/send", auth, async (req,res) => {
    const { recipients, subject, body } = req.body;
    const userID = req._user._id

    const sentEmail = new sentEmailModel({ sender: userID, recipients, subject, body })
    // sending email code 

    const user = await userModel.findById(userID)
    user.sentEmails.push(sentEmail);
    console.log(await user.save())
    res.send(sentEmail)
})

module.exports = router