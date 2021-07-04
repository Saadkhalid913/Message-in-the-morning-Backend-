const mongoose = require("mongoose");
const userSchema = require("./userSchema")
const emailTemplateSchema = require("./emailTemplateSchema")
const emailListSchema = require("./emailListSchema")
const sentEmailSchema = require("./sentEmailSchema")


const userModel = mongoose.model("users", userSchema);
const sentEmailModel = mongoose.model("sentEmails", sentEmailSchema)
const emailTemplateModel = mongoose.model("emailTemplates", emailTemplateSchema)
const emailListModel = mongoose.model("emailLists", emailListSchema)

module.exports = { userModel , sentEmailModel, emailListModel, emailTemplateModel } 