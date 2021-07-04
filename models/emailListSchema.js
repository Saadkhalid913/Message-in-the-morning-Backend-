const mongoose = require("mongoose")
const emailTemplateSchema = require("./emailTemplateSchema")

emailListSchema = new mongoose.Schema({
    name: String,
    recipients: [String]
})


module.exports = emailListSchema;
